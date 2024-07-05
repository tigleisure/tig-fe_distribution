import Header from '@components/all/Header';
import NavBar from '@components/all/NavBar/NavBar';
import Review from '@components/reservation-list/review/Review';
import { ReviewProps } from 'types/reservation-list/review/ReservationListReviewPageTypes';

export default function page() {
  const DUMMYREVIEWDATA: ReviewProps = {
    companyName: '스카이락볼링장',
    companyAddress: '서울 서대문구 신촌로 73',
    eventDate: '05.17 (금)',
    eventStartTime: '오전 10:00',
    eventEndTime: '오전 11:00',
    adultCount: 2,
    reservationUserName: '김티그',
    rating: 4,
    rateContent:
      '역 근처에 시설도 깔끔하고 좋아요! 신촌 볼링장 하면 꼭 여기로 가요. 직원분들도 친절하고 레일도 많고 최고! 담에 친구들이랑 단체 모임하면 또 갈게요~!',
  };

  return (
    <>
      <div id="header-wrapper" className="w-full h-fit absolute top-0">
        <Header buttonType="back" title="작성한 리뷰" />
      </div>
      <main className="pt-[44px] w-full h-fit flex justify-center">
        <Review {...DUMMYREVIEWDATA} />
      </main>
      <NavBar />
    </>
  );
}
