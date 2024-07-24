import HistoryComponentUpperSection from './all/HistoryComponentUpperSection';
import { HistoryEndItemProps } from 'types/reservation-list/ReservationListPageTypes';
import FullButton from '@components/all/FullButton';
import Link from 'next/link';

export default function HistoryEndItem({
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
  reservationStatus,
  reservationId,
  reviewId,
}: HistoryEndItemProps) {
  console.log(reviewId);
  return (
    <Link
      href={`/reservation-list/reservation/${reservationId}`}
      className="w-eightNineWidth h-fit p-5 gap-y-6 flex flex-col justify-between items-center shadow-myPageLogoutButton rounded-[10px]"
    >
      <HistoryComponentUpperSection
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
      {reservationStatus === 'DONE' && (
        <FullButton
          size="sm"
          color="white"
          bgColor="black"
          content="리뷰 작성하기"
          clickTask="move-to-writing-review-page"
          sendingData={{
            reservationId: reservationId,
          }}
        />
      )}
      {reservationStatus === 'REVIEWED' && (
        <FullButton
          size="sm"
          color="grey5"
          bgColor="white"
          content="작성한 리뷰 보기"
          className="shadow-watchReviewButton"
          clickTask="move-to-written-review-page"
          sendingData={{
            reviewId: reviewId,
          }}
        />
      )}
      {reservationStatus === 'DECLINED' && (
        <FullButton
          bgColor="grey3"
          color="white"
          size="sm"
          content="예약 거절됨"
          disabled
        />
      )}
      {reservationStatus === 'CANCELED' && (
        <FullButton
          bgColor="status_red1_opacity"
          color="status_red1"
          size="sm"
          content="예약 취소됨"
          disabled
        />
      )}
    </Link>
  );
}
