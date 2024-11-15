interface BeforeSecondStageFinalPriceCardProps {
  couponDiscountPrice: number;
  defaultPrice: number;
}

export default function BeforeSecondStageFinalPriceCard({
  couponDiscountPrice,
  defaultPrice,
}: BeforeSecondStageFinalPriceCardProps) {
  return (
    <div className="w-full h-fit rounded-[10px] flex flex-col py-5 items-center gap-y-5 bg-white shadow-myPageLogoutButton">
      <div className="w-sevenEightWidth h-fit flex justify-start items-center title3 text-grey7">
        최종 결제 금액
      </div>
      <div className="w-sevenEightWidth border-b-[1px] border-grey2" />
      <div className="w-sevenEightWidth flex justify-between items-center">
        <span className="title4 text-grey4">예약 금액</span>
        <span className="body4 text-grey6">
          {defaultPrice && defaultPrice.toLocaleString()}원
        </span>
      </div>
      <div className="w-sevenEightWidth flex justify-between items-center">
        <span className="title4 text-grey4">쿠폰 할인 금액</span>
        <span className="body4 text-grey6">
          -{couponDiscountPrice.toLocaleString()}원
        </span>
      </div>
      <div className="w-sevenEightWidth border-b-[1px] border-grey4s" />
      <div className="w-sevenEightWidth h-fit flex flex-col gap-y-[6px]">
        <div className="w-full flex justify-between items-center">
          <span className="title4 text-grey6">총 결제 금액</span>
          <div className=" flex items-center headline2 text-status_red1">
            {defaultPrice - couponDiscountPrice > 0
              ? (defaultPrice - couponDiscountPrice).toLocaleString()
              : 0}
            <span className="title3 text-status_red1">원</span>
          </div>
        </div>
        <div className="w-full flex justify-end items-center caption4 text-grey3">
          세금 및 수수료 포함
        </div>
      </div>
    </div>
  );
}
