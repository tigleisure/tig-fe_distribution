import { extractReservationMoment } from '@utils/formatDate';
interface PaymentInfoProps {
  paymentTime: string;
  payMethod: string;
}

export default function PaymentInfoSection({
  paymentTime,
  payMethod,
}: PaymentInfoProps) {
  return (
    <section className="w-full h-fit flex flex-col items-start gap-y-5">
      <div className="title3 text-grey7">결제 정보</div>
      <div className="flex flex-col gap-y-[14px]">
        <div className="flex items-center gap-x-5">
          <span className="caption2 text-grey4">결제 일시</span>
          <span className="caption2 text-grey6">
            {extractReservationMoment(paymentTime)}
          </span>
        </div>
        <div className="flex items-center gap-x-5">
          <span className="caption2 text-grey4">결제 수단</span>
          <span className="caption2 text-grey6">
            {payMethod === 'TOSSPAY' ? '토스페이' : '카카오페이'}
          </span>
        </div>
      </div>
    </section>
  );
}
