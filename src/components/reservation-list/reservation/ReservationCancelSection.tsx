'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useGetUserSpecificReservationInfo } from '@apis/reservation-list/reservation/getUserSpecificReservationInfo';
import { useDeleteUserSpecificReservation } from '@apis/reservation-list/reservation/deleteUserSpecificReservation';
import cancelPortOnePayment from '@apis/portone/cancelPayment';

interface ReservationCancelProps {
  cancelAvailableDate: string;
  status: 'TBC' | 'CONFIRMED' | 'DECLINED' | 'CANCELED' | 'REVIEWED' | 'DONE';
  paymentId: string;
}

export default function ReservationCancelSection({
  cancelAvailableDate,
  status,
  paymentId,
}: ReservationCancelProps) {
  const pathname = usePathname();
  const reservationId = pathname.split('/').at(-1);
  const router = useRouter();

  const { data } = useGetUserSpecificReservationInfo(
    parseInt(reservationId as string)
  );

  const cancelReservationMutation = useDeleteUserSpecificReservation();

  console.log(data);

  return (
    <section className="w-full h-fit flex flex-col items-start gap-y-5 ">
      <div className="flex flex-col w-full items-start gap-y-[10px]">
        <span className="title3 text-grey7">예약 취소</span>
        <span className="caption2 text-grey4">
          {cancelAvailableDate}까지 무료 취소 가능합니다
        </span>
      </div>
      {status === 'TBC' || status === 'CONFIRMED' ? (
        <button
          className="w-[72px] h-[33px] rounded-[4px] bg-white text-status_red1 body4 shadow-cancelButton"
          onClick={() => {
            cancelReservationMutation.mutate(
              parseInt(reservationId as string),
              {
                onSuccess() {
                  cancelPortOnePayment(
                    paymentId,
                    '고객에 의한 예약 취소입니다'
                  );
                  router.push('/reservation-list');
                },
              }
            );
          }}
        >
          예약취소
        </button>
      ) : (
        <button className="w-[72px] h-[33px] rounded-[4px] bg-white text-grey3 body4 shadow-writingReviewInput">
          예약취소
        </button>
      )}
    </section>
  );
}
