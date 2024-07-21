import Header from '@components/all/Header';
import NavBar from '@components/all/NavBar/NavBar';
import HistoryDetail from '@components/reservation-list/reservation/HistoryDetail';
import { da } from 'date-fns/locale';
import { ReservationDetailProps } from 'types/reservation-list/reservation/ReservationDetailType';

export default async function page({
  params,
}: {
  params: {
    reservationId: string;
  };
}) {
  // const DUMMYRESERVATIONDATA: ReservationDetailProps = {
  //   clubName: '스카이락볼링장',
  //   clubAddress: '서울 서대문구 신촌로 73',
  //   eventDate: '05.17 (금)',
  //   eventStartTime: '오전 10:00',
  //   eventEndTime: '오전 11:00',
  //   adultCount: 2,
  //   reservationId: '2406200900A3D8YE1',
  //   reservationUserName: '김티그',
  //   phoneNumber: '010-1235-5678',
  //   paymentTime: '2024.06.18 (화) 19:51',
  //   payMethod: '카카오페이',
  //   reservationPrice: 40000,
  //   feePrice: 4000,
  //   couponDiscountPrice: 0,
  //   cancelAvailableDate: '2024년 08월 02일 13:00',
  // };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/reservation/${params.reservationId}`
  );

  const data = await response.json();

  console.log(data);

  return (
    <div className="flex flex-col h-full relative ">
      <Header buttonType="back" title="예약 상세" />

      <main className="mt-[68px] mb-[54px] w-full h-full flex justify-center overflow-y-scroll">
        <HistoryDetail
          clubName={data.result.clubName}
          clubAddress={data.result.clubAddress}
          date={data.result.date}
          startTime={data.result.startTime}
          endTime={data.result.endTime}
          adultCount={data.result.adultCounts}
          teenagerCount={data.result.teenagerCount}
          kidsCount={data.result.kidsCount}
          reservationId={data.result.reservationId}
          memberName={data.result.memberName}
          phoneNumber="010-4925-1427"
          paymentTime="2024.06.18 (화) 19:51"
          payMethod="카카오페이"
          price={data.result.price}
          feePrice={0}
          couponDiscountPrice={0}
          cancelAvailableDate="2024년 08월 02일 13:00"
          status={data.result.status}
        />
      </main>
      {/* <NavBar /> */}
    </div>
  );
}
