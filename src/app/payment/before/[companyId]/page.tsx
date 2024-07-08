import Header from '@components/all/Header';
import ReservationStageBar from '@components/payment/before/ReservationStageBar';
import BeforeFirstStageCard from '@components/payment/before/BeforeFirstStageCard';
import FullButton from '@components/all/FullButton';

const DUMMYFIRSTSTAGEDATA = {
  companyName: '스카이락 볼링장',
  companyAddress: '서울 서대문구 신촌로 73 케이스퀘어 8층',
  eventDate: '05.17 (금)',
  adultCount: 2,
  eventStartTime: '오전 10:00',
  eventEndTime: '오전 11:00',
  stageFirstPrice: 22000,
};

export default function page() {
  return (
    <main className="w-full h-full flex flex-col items-center bg-grey1">
      <Header buttonType="close" isCenter title="예약확인" bgColor="grey" />
      <ReservationStageBar />
      <BeforeFirstStageCard {...DUMMYFIRSTSTAGEDATA} />
      <FullButton
        size="lg"
        color="white"
        bgColor="primary_orange1"
        content="확인"
        className="absolute !w-eightNineWidth bottom-[30px]"
      />
    </main>
  );
}
