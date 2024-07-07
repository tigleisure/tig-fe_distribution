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
  youngManCount,
  kidCount,
  closedReservationStatus,
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
        companyName={companyName}
        companyAddress={companyAddress}
        eventDate={eventDate}
        eventStartTime={eventStartTime}
        eventEndTime={eventEndTime}
        adultCount={adultCount}
        youngManCount={youngManCount}
        kidCount={kidCount}
      />
      {closedReservationStatus === 'notYetReviewed' && (
        <Link href={`/writing-review/${reservationId}`} className="w-full">
          <FullButton
            size="sm"
            color="white"
            bgColor="black"
            content="리뷰 작성하기"
          />
        </Link>
      )}
      {closedReservationStatus === 'alreadyReviewed' && (
        <Link href={`/reservation-list/review/${reviewId}`} className="w-full">
          <FullButton
            size="sm"
            color="grey5"
            bgColor="white"
            content="작성한 리뷰 보기"
            className="shadow-watchReviewButton"
          />
        </Link>
      )}
      {closedReservationStatus === 'denied' && (
        <FullButton
          bgColor="grey3"
          color="white"
          size="sm"
          content="예약 거절됨"
        />
      )}
      {closedReservationStatus === 'canceled' && (
        <FullButton
          bgColor="status_red1_opacity"
          color="status_red1"
          size="sm"
          content="예약 취소됨"
        />
      )}
    </Link>
  );
}
