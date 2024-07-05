import Header from '@components/all/Header';
import NavBar from '@components/all/NavBar/NavBar';
import HistoryDetail from '@components/reservation-list/reservation/HistoryDetail';
import { ReservationDetailProps } from 'types/reservation-list/reservation/ReservationDetailType';

export default function page() {
  const DUMMYRESERVATIONDATA: ReservationDetailProps = {
    companyName: '스카이락볼링장',
    companyAddress: '서울 서대문구 신촌로 73',
    eventDate: '05.17 (금)',
    eventStartTime: '오전 10:00',
    eventEndTime: '오전 11:00',
    adultCount: 2,
    reservationNumber: '2406200900A3D8YE1',
    reservationUserName: '김티그',
    phoneNumber: '010-1235-5678',
    paymentTime: '2024.06.18 (화) 19:51',
    payMethod: '카카오페이',
    reservationPrice: 40000,
    feePrice: 4000,
    couponDiscountPrice: 0,
    cancelAvailableDate: '2024년 08월 02일 13:00',
  };

  return (
    <div className="flex flex-col h-full relative ">
      <div id="header-wrapper" className="w-full absolute top-0">
        <Header buttonType="back" title="예약 상세" />
      </div>
      <main className="mt-[44px] mb-[54px] w-full h-full flex justify-center overflow-y-scroll">
        <HistoryDetail {...DUMMYRESERVATIONDATA} />
      </main>
      <NavBar />
    </div>
  );
}
