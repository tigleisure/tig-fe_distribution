import FullButton from '@components/all/FullButton';
import HistoryComponentUpperSection from '../all/HistoryComponentUpperSection';
import { HistoryInProgressItemProps } from 'types/reservation-list/ReservationListPageTypes';
import useModal from '@store/modalStore';
import Link from 'next/link';

export default function HistoryInProgressItem({
  clubName,
  clubAddress,
  date,
  startTime,
  endTime,
  gameCount,
  adultCount,
  teenagerCount,
  kidsCount,
  status,
  reservationId,
  paymentId,
  imageUrls,
  handleChangeCancelPaymentId,
  handleChangeCancelReservationId,
}: HistoryInProgressItemProps) {
  const setModalOpen = useModal((state) => state.setSelectedIsModalOpen);

  return (
    <Link
      href={`/reservation-list/reservation/${reservationId}`}
      className="w-eightNineWidth h-fit p-5 gap-y-6 flex flex-col justify-between items-center shadow-myPageLogoutButton rounded-[10px]"
    >
      <HistoryComponentUpperSection
        clubName={clubName}
        clubAddress={clubAddress}
        date={date}
        startTime={startTime}
        endTime={endTime}
        gameCount={gameCount}
        adultCount={adultCount}
        teenagerCount={teenagerCount}
        kidsCount={kidsCount}
        imageUrls={imageUrls}
      />
      {status === 'TBC' && (
        <div className="w-full h-fit flex gap-[10px]">
          <FullButton
            bgColor="white"
            color="status_red1"
            size="sm"
            content="예약 취소"
            className="shadow-cancelButton"
            onClick={(ev) => {
              // 상위 reservation-list 페이지에서 만든 cancelPaymentI와 cancelReservationId를 바꿔주고 모달을 띄운다.
              handleChangeCancelPaymentId(paymentId as string);
              handleChangeCancelReservationId(reservationId);
              setModalOpen(true);
              ev.stopPropagation();
              ev.preventDefault();
            }}
          />
          <FullButton
            bgColor="primary_orange2"
            color="primary_orange1"
            size="sm"
            content="예약 확인중"
            disabled
          />
        </div>
      )}

      {status === 'CONFIRMED' && (
        <div className="w-full h-fit flex gap-[10px]">
          <FullButton
            bgColor="white"
            color="status_red1"
            size="sm"
            content="예약 취소"
            clickTask="cancel-reservation"
            className="shadow-cancelButton"
            onClick={(ev) => {
              handleChangeCancelPaymentId(paymentId as string);
              setModalOpen(true);
              handleChangeCancelReservationId(reservationId);
              ev.stopPropagation();
              ev.preventDefault();
            }}
          />
          <FullButton
            bgColor="primary_orange1"
            color="white"
            size="sm"
            content="예약 확정됨"
            disabled
          />
        </div>
      )}
    </Link>
  );
}
