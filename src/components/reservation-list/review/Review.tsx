import HistoryComponentUpperSection from '@components/all/HistoryComponentUpperSection';
import ReviewLowerSection from './ReviewLowerSection';
import { ReviewProps } from 'types/reservation-list/review/ReservationListReviewPageTypes';

export default function Review({
  imageUrls,
  clubName,
  clubAddress,
  date,
  startTime,
  endTime,
  gameCount,
  adultCount,
  teenagerCount,
  kidsCount,
  reservationUserName,
  rating,
  rateContent,
  gameDescription,
}: ReviewProps) {
  return (
    <div className="mt-5 p-5 rounded-[10px] w-eightNineWidth h-fit flex flex-col items-center gap-y-5 bg-white shadow-myPageLogoutButton">
      <HistoryComponentUpperSection
        imageUrls={imageUrls}
        clubName={clubName}
        clubAddress={clubAddress}
        date={date}
        startTime={startTime}
        endTime={endTime}
        gameCount={gameCount}
        adultCount={adultCount}
        teenagerCount={teenagerCount}
        kidsCount={kidsCount}
        gameDescription={gameDescription}
      />
      <div className="w-full border-[1px] border-grey2" />
      <ReviewLowerSection
        userName={reservationUserName}
        startTime={date}
        adultCount={adultCount || 0}
        teenagerCount={teenagerCount || 0}
        kidsCount={kidsCount || 0}
        rating={rating}
        contents={rateContent}
        className="!px-0"
      />
    </div>
  );
}
