'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useGetUserSpecificReservationInfo } from '@apis/reservation-list/reservation/getUserSpecificReservationInfo';
import { useDeleteUserSpecificReservation } from '@apis/reservation-list/reservation/deleteUserSpecificReservation';
import cancelPortOnePayment from '@apis/portone/cancelPayment';
import { useQueryClient } from '@tanstack/react-query';
import handleSendTigCancelFailToDiscord from '@apis/discord/sendBackendCancelFailMessageToDiscord';

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

  const queryClient = useQueryClient();

  const cancelReservationMutation = useDeleteUserSpecificReservation();

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
          onClick={async () => {
            const cancelPortOneResponse = await cancelPortOnePayment(
              paymentId,
              '고객에 의한 예약 취소입니다'
            );

            if (cancelPortOneResponse.status !== 'SUCCEEDED') {
              alert(
                '결제 취소 요청이 실패했습니다! TIG 팀에 문의주시면 감사하겠습니다'
              );
            } else {
              cancelReservationMutation.mutate(
                parseInt(reservationId as string),
                {
                  onSuccess(data, variables, context) {
                    queryClient.invalidateQueries({
                      queryKey: ['userReservationList'],
                    });
                    if (data.resultCode === 200) {
                      router.replace('/');
                    } else {
                      // Discord로 기획 쪽에 알리는 로직
                      handleSendTigCancelFailToDiscord(
                        parseInt(reservationId as string),
                        paymentId
                      );
                    }
                  },
                }
              );
            }
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
