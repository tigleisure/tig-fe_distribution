interface PriceInfoProps {
  reservationPrice: number;
  feePrice: number;
  couponDiscountPrice: number;
}

export default function PriceInfoSection({
  reservationPrice,
  feePrice,
  couponDiscountPrice,
}: PriceInfoProps) {
  console.log(reservationPrice);
  return (
    <section className="w-sevenEightWidth h-fit flex flex-col items-start gap-y-5">
      <div className="title3 text-grey7">결제 금액</div>
      <div className="w-full flex flex-col gap-y-[14px]">
        <div className="w-full flex justify-between items-center">
          <span className="caption2 text-grey4">예약 금액</span>
          <span className="caption2 text-grey6">
            {reservationPrice.toLocaleString()}원
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="caption2 text-grey4">수수료</span>
          <span className="caption2 text-grey6">
            {feePrice.toLocaleString()}원
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="caption2 text-grey4">쿠폰 할인</span>
          <span className="caption2 text-grey6">
            {couponDiscountPrice.toLocaleString()}원
          </span>
        </div>
      </div>
    </section>
  );
}
