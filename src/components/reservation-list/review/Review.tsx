import HistoryComponentUpperSection from '@components/reservation-list/all/HistoryComponentUpperSection';
import ReviewLowerSection from './ReviewLowerSection';
import { ReviewProps } from 'types/reservation-list/review/ReservationListReviewPageTypes';

export default function Review({
  imageUrl,
  clubName,
  clubAddress,
  eventDate,
  eventStartTime,
  eventEndTime,
  gameCount,
  adultCount,
  teenagerCount,
  kidsCount,
  reservationUserName,
  rating,
  rateContent,
}: ReviewProps) {
  return (
    <div className="mt-5 p-5 rounded-[10px] w-eightNineWidth h-fit flex flex-col items-center gap-y-5 bg-white shadow-myPageLogoutButton">
      <HistoryComponentUpperSection
        imageUrl={imageUrl}
        clubName={clubName}
        clubAddress={clubAddress}
        eventDate={eventDate}
        eventStartTime={eventStartTime}
        eventEndTime={eventEndTime}
        gameCount={gameCount}
        adultCount={adultCount}
        teenagerCount={teenagerCount}
        kidsCount={kidsCount}
      />
      <div className="w-full border-[1px] border-grey2" />

      <ReviewLowerSection
        userName={reservationUserName}
        startTime={eventDate}
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
