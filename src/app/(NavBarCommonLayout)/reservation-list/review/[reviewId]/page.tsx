import Header from '@components/all/Header';
import Review from '@components/reservation-list/review/Review';

interface reviewIdPathnameProp {
  params: {
    reviewId: string;
  };
}

export default async function Page({ params }: reviewIdPathnameProp) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/review/${params.reviewId}`,
    { cache: 'no-store' }
  );

  const reviewData = await response.json();

  const reviewDataObject = {
    clubName: reviewData.result.reservation.clubName,
    clubAddress: reviewData.result.reservation.clubAddress,
    eventDate: reviewData.result.reservation.date,
    eventStartTime: reviewData.result.reservation.startTime,
    eventEndTime: reviewData.result.reservation.endTime,
    gameCount: reviewData.result.reservation.gameCount,
    adultCount: reviewData.result.reservation.adultCount,
    teenagerCount: reviewData.result.reservation.teenagerCount,
    kidsCount: reviewData.result.reservation.kidsCount,
    reservationUserName: reviewData.result.reservation.memberName,
    rating: reviewData.result.review.rating,
    rateContent: reviewData.result.review.contents,
    imageUrls: reviewData.result.reservation.imageUrls,
  };

  return (
    <div className="flex flex-col h-full relative ">
      <Header buttonType="back" title="작성한 리뷰" />
      <main className="pt-[68px] w-full h-fit flex justify-center">
        <Review {...reviewDataObject} />
      </main>
    </div>
  );
}
