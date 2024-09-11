import FullButton from '@components/all/FullButton';
import { HistoryInAdminItemProps } from 'types/reservation-list/ReservationListPageTypes';
import useModal from '@store/modalStore';
import Link from 'next/link';
import cancelPortOnePayment from '@apis/portone/cancelPayment';
import { useConfirmReservation } from '@apis/djemalsvpdlwl/confirmReservation';
import { useDeclineReservation } from '@apis/djemalsvpdlwl/declineReservation';
import HistoryComponentUpperSection from '@components/all/HistoryComponentUpperSection';

export default function HistoryInAdminItem({
  clubName,
  userName,
  date,
  startTime,
  endTime,
  adultCount,
  teenagerCount,
  kidsCount,
  reservationId,
  clubPhoneNumber,
}: HistoryInAdminItemProps) {
  const { mutate: confirmReservation } = useConfirmReservation();
  const { mutate: declineReservation } = useDeclineReservation();
  return (
    <Link
      href={`/reservation-list/reservation/${reservationId}`}
      className="w-eightNineWidth h-fit p-5 gap-y-2 flex flex-col justify-between items-center shadow-myPageLogoutButton rounded-[10px]"
    >
      <HistoryComponentUpperSection
        clubName={clubName}
        clubAddress={`reservation id: ${String(reservationId)}`}
        date={date}
        startTime={startTime}
        endTime={endTime}
        gameCount={0}
        adultCount={adultCount}
        teenagerCount={teenagerCount}
        kidsCount={kidsCount}
      />
      <p className="body4">예약자 이름: {userName}</p>
      <p className="body4">업체 번호: {clubPhoneNumber}</p>
      <div className="w-full h-fit flex gap-[10px]">
        <FullButton
          bgColor="white"
          color="status_red1"
          size="sm"
          content="예약 거절"
          className="shadow-cancelButton"
          onClick={(ev) => {
            // atomic 보장해줘야 함 (예약 거절과 결제 취소는 동시에 이루어져야 함) -> 추후 수정 필요
            declineReservation(reservationId);
            // cancelPortOnePayment(paymentId || '');
            ev.stopPropagation();
            ev.preventDefault();
          }}
        />
        <FullButton
          bgColor="primary_orange1"
          color="white"
          size="sm"
          content="예약 승인"
          onClick={(ev) => {
            confirmReservation(reservationId);
            ev.stopPropagation();
            ev.preventDefault();
          }}
        />
      </div>
    </Link>
  );
}
