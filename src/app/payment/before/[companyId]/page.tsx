import Header from '@components/all/Header';
import ReservationStageBar from '@components/payment/before/ReservationStageBar';

export default function page() {
  return (
    <main className="w-full h-full bg-grey1">
      <Header buttonType="close" isCenter title="예약확인" bgColor="grey" />
      <ReservationStageBar />
    </main>
  );
}
