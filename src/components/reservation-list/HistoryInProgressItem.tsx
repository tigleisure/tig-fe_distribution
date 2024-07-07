import FullButton from '@components/all/FullButton';
import HistoryComponentUpperSection from './all/HistoryComponentUpperSection';
import { HistoryInProgressItemProps } from 'types/reservation-list/ReservationListPageTypes';
import useModal from '@store/modalStore';

export default function HistoryInProgressItem({
  imageUrl,
  companyName,
  companyAddress,
  eventDate,
  eventStartTime,
  eventEndTime,
  adultCount,
  youngManCount,
  kidCount,
  reservationStatus,
}: HistoryInProgressItemProps) {
  const isModalOpen = useModal((state) => state.selectedIsModalOpen);
  const setModalOpen = useModal((state) => state.setSelectedIsModalOpen);

  return (
    <div className="w-eightNineWidth h-fit p-5 gap-y-6 flex flex-col justify-between items-center shadow-myPageLogoutButton rounded-[10px]">
      <HistoryComponentUpperSection
        companyName={companyName}
        companyAddress={companyAddress}
        eventDate={eventDate}
        eventStartTime={eventStartTime}
        eventEndTime={eventEndTime}
        adultCount={adultCount}
        youngManCount={youngManCount}
        kidCount={kidCount}
      />
      {reservationStatus === 'inProgress' && (
        <div className="w-full h-fit flex gap-[10px]">
          <FullButton
            bgColor="white"
            color="status_red1"
            size="sm"
            content="예약 취소"
            className="shadow-cancelButton"
            onClick={() => setModalOpen(true)}
          />
          <FullButton
            bgColor="primary_orange2"
            color="primary_orange1"
            size="sm"
            content="예약 확인중"
          />
        </div>
      )}

      {reservationStatus === 'confirmed' && (
        <div className="w-full h-fit flex gap-[10px]">
          <FullButton
            bgColor="white"
            color="status_red1"
            size="sm"
            content="예약 취소"
            className="shadow-cancelButton"
          />
          <FullButton
            bgColor="primary_orange1"
            color="white"
            size="sm"
            content="예약 확정됨"
          />
        </div>
      )}
    </div>
  );
}
