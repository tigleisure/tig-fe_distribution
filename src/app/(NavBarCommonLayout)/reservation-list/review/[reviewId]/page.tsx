import Header from '@components/all/Header';
import Review from '@components/reservation-list/review/Review';
import { ReviewProps } from 'types/reservation-list/review/ReservationListReviewPageTypes';
// reviewId로 해당 review를 따와서 보여줘야 됨

interface reviewIdPathnameProp {
  params: {
    reviewId: string;
  };
}

interface reviewResponse {
  imageUrl?: string;
  clubName: string;
  clubAddress: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  gameCount: number | null;
  adultCount?: number;
  teenagerCount?: number;
  kidsCount?: number;
  className?: string;
  reservationUserName: string;
  rating: number;
  rateContent: string;
}

export default async function Page({ params }: reviewIdPathnameProp) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/review/${params.reviewId}`,
    { cache: 'no-store' }
  );

  const reviewData = await response.json();

  console.log(reviewData);

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
  };

  // const DUMMYREVIEWDATA: ReviewProps = {
  //   clubName: '스카이락볼링장',
  //   clubAddress: '서울 서대문구 신촌로 73',
  //   eventDate: '05.17 (금)',
  //   eventStartTime: '오전 10:00',
  //   eventEndTime: '오전 11:00',
  //   gameCount: 0,
  //   adultCount: 2,
  //   reservationUserName: '김티그',
  //   rating: 4,
  //   rateContent:
  //     '역 근처에 시설도 깔끔하고 좋아요! 신촌 볼링장 하면 꼭 여기로 가요. 직원분들도 친절하고 레일도 많고 최고! 담에 친구들이랑 단체 모임하면 또 갈게요~!',
  // };

  return (
    <div className="flex flex-col h-full relative ">
      <Header buttonType="back" title="작성한 리뷰" />

      <main className="pt-[68px] w-full h-fit flex justify-center">
        <Review {...reviewDataObject} />
      </main>
    </div>
  );
}
