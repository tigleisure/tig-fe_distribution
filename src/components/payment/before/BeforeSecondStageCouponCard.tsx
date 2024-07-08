interface BeforeSecondStageCouponCardProps {
  isDiscountCouponAvailable: boolean; // 사용 가능한 쿠폰이 남아 있는지를 조회하는 속성
  couponDiscountPrice: number;
}

export default function BeforeSecondStageCouponCard({
  isDiscountCouponAvailable,
  couponDiscountPrice,
}: BeforeSecondStageCouponCardProps) {
  return (
    <div className="w-full h-fit rounded-[10px] flex flex-col items-center py-5 gap-y-5 bg-white">
      <div className="w-sevenEightWidth title3 text-grey7">쿠폰 할인</div>
      <div className="w-sevenEightWidth border-b-[1px] border-grey2" />
      <div className="w-sevenEightWidth flex justify-between items-center">
        <div className="w-fit h-full flex justify-between items-center gap-x-5">
          <span className="title4 text-grey6">일반 쿠폰</span>
          {!isDiscountCouponAvailable && (
            <span className="body4 text-grey3">
              적용 가능한 쿠폰이 없습니다.
            </span>
          )}
          {isDiscountCouponAvailable && (
            <button className="px-[10px] w-fit h-full py-1 bg-black text-white title4 rounded-[6px]">
              사용하기
            </button>
          )}
        </div>
        <span className="body4 text-grey6">-{couponDiscountPrice}원</span>
      </div>
    </div>
  );
}
