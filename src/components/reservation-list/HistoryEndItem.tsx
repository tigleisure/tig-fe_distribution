import HistoryComponentUpperSection from './all/HistoryComponentUpperSection';
import { HistoryEndItemProps } from 'types/reservation-list/ReservationListPageTypes';
import FullButton from '@components/all/FullButton';

export default function HistoryEndItem({
  imageUrl,
  companyName,
  companyAddress,
  eventDate,
  eventStartTime,
  eventEndTime,
  adultCount,
  youngManCount,
  kidCount,
  isReviewed,
}: HistoryEndItemProps) {
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
      {isReviewed === false ? (
        <FullButton
          size="sm"
          color="white"
          bgColor="black"
          content="리뷰 작성하기"
        />
      ) : (
        <FullButton
          size="sm"
          color="grey5"
          bgColor="white"
          content="작성한 리뷰 보기"
          className="shadow-watchReviewButton"
        />
      )}
    </div>
  );
}
