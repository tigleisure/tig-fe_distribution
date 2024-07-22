import Header from '@components/all/Header';
import PaymentAfterConfirm from '@components/payment/after/PaymentAfterConfirm';
import FullButton from '@components/all/FullButton';

export default function page({
  params,
}: {
  params: {
    reservationId: string;
  };
}) {
  return (
    <main className="w-full h-full flex flex-col items-center bg-grey1 pb-[100px] overflow-y-scroll">
      <Header buttonType="close" isCenter title="예약 결제" bgColor="grey" />
      <PaymentAfterConfirm reservationId={params.reservationId} />
      <FullButton
        size="lg"
        color="white"
        bgColor="primary_orange1"
        content="확인"
        className="!w-eightNineWidth absolute bottom-[30px]"
        clickTask="move-to-home-page"
      />
    </main>
  );
}
