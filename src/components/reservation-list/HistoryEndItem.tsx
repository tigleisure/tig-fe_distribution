import HistoryComponentUpperSection from './all/HistoryComponentUpperSection';
import { HistoryEndItemProps } from 'types/reservation-list/ReservationListPageTypes';
import FullButton from '@components/all/FullButton';
import Link from 'next/link';

export default function HistoryEndItem({
  imageUrl,
  companyName,
  companyAddress,
  eventDate,
  eventStartTime,
  eventEndTime,
  adultCount,
  teenagerCount,
  kidsCount,
  closedReservationStatus,
  reservationId,
  reviewId,
}: HistoryEndItemProps) {
  return (
    <Link
      href={`/reservation-list/reservation/${reservationId}`}
      className="w-eightNineWidth h-fit p-5 gap-y-6 flex flex-col justify-between items-center shadow-myPageLogoutButton rounded-[10px]"
    >
      <HistoryComponentUpperSection
        companyName={companyName}
        companyAddress={companyAddress}
        eventDate={eventDate}
        eventStartTime={eventStartTime}
        eventEndTime={eventEndTime}
        adultCount={adultCount}
        teenagerCount={teenagerCount}
        kidsCount={kidsCount}
      />
      {closedReservationStatus === 'notYetReviewed' && (
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
      {closedReservationStatus === 'alreadyReviewed' && (
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
      {closedReservationStatus === 'denied' && (
        <FullButton
          bgColor="grey3"
          color="white"
          size="sm"
          content="예약 거절됨"
          disabled
        />
      )}
      {closedReservationStatus === 'canceled' && (
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
