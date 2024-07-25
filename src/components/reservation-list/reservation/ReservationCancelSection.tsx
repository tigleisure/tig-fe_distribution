'use client';
import { usePathname } from 'next/navigation';
import { useGetUserSpecificReservationInfo } from '@apis/reservation-list/reservation/getUserSpecificReservationInfo';

interface ReservationCancelProps {
  cancelAvailableDate: string;
  status: 'TBC' | 'CONFIRMED' | 'DECLINED' | 'CANCELED' | 'REVIEWED' | 'DONE';
}

export default function ReservationCancelSection({
  cancelAvailableDate,
  status,
}: ReservationCancelProps) {
  const pathname = usePathname();
  const reservationId = pathname.split('/').at(-1);

  const { data } = useGetUserSpecificReservationInfo(
    parseInt(reservationId as string)
  );

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
        <button className="w-[72px] h-[33px] rounded-[4px] bg-white text-status_red1 body4 shadow-cancelButton">
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
