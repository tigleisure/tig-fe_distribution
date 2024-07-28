import Header from '@components/all/Header';
import HistoryDetail from '@components/reservation-list/reservation/HistoryDetail';

export default async function page({
  params,
}: {
  params: {
    reservationId: string;
  };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/reservation/${params.reservationId}`,
    { cache: 'no-store' }
  );

  const data = await response.json();

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
          gameCount={data.result.gameCount}
          adultCount={data.result.adultCount}
          teenagerCount={data.result.teenagerCount}
          kidsCount={data.result.kidsCount}
          reservationId={data.result.reservationId}
          memberName={data.result.memberName}
          phoneNumber="010-4925-1427"
          paymentTime={data.result.updatedAt}
          payMethod={data.result.provider}
          price={data.result.price}
          feePrice={0} // 추후에 백엔드에서 보내줄 필요가 있음
          couponDiscountPrice={0} // 백엔드에서 보내줄 필요가 있음
          cancelAvailableDate="2024년 08월 02일 13:00"
          status={data.result.status}
          paymentId={data.result.paymentId}
        />
      </main>
    </div>
  );
}
