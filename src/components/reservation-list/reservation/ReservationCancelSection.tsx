'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useDeleteUserSpecificReservation } from '@apis/reservation-list/reservation/deleteUserSpecificReservation';
import cancelPortOnePayment from '@apis/portone/cancelPayment';
import { useQueryClient } from '@tanstack/react-query';
import handleSendTigCancelFailToDiscord from '@apis/discord/sendBackendCancelFailMessageToDiscord';
import useModal from '@store/modalStore';
import { extractReservationMoment } from '@utils/formatDate';
import { formatDate, subDays } from 'date-fns';

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
  const availableCancelDate = formatDate(subDays(new Date(cancelAvailableDate), 1), 'yyyy년 MM월 dd일 hh:mm');

  const setIsModalOpen = useModal((state) => state.setSelectedIsModalOpen);

  return (
    <section className="w-full h-fit flex flex-col items-start gap-y-5 ">
      <div className="flex flex-col w-full items-start gap-y-[10px]">
        <span className="title3 text-grey7">예약 취소</span>
        <span className="caption2 text-grey4">
          {availableCancelDate}까지 무료 취소 가능합니다
        </span>
      </div>
      {status === 'TBC' || status === 'CONFIRMED' ? (
        <button
          className="w-[72px] h-[33px] rounded-[4px] bg-white text-status_red1 body4 shadow-cancelButton"
          onClick={() => {
            setIsModalOpen(true);
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
