'use client';
import { useState, useEffect } from 'react';

interface BeforeSecondStageCouponCardProps {
  couponDiscountPrice: number;
}

export default function BeforeSecondStageCouponCard({
  couponDiscountPrice,
}: BeforeSecondStageCouponCardProps) {
  const [isDiscountCouponAvailable, setIsDiscountCouponAvailable] =
    useState<boolean>(false);

  useEffect(() => {
    // 추후에 백엔드로부터 쿠폰 데이터가 남아있는가를 백엔드 api로부터 받아올 것임
    // setIsDiscountCouponAvailable(true);
  }, []);

  return (
    <div className="w-full h-fit rounded-[10px] flex flex-col items-center py-5 gap-y-5 bg-white">
      <div className="w-sevenEightWidth title3 text-grey7">쿠폰 할인</div>
      <div className="w-sevenEightWidth border-b-[1px] border-grey2" />
      <div className="w-sevenEightWidth flex justify-between items-center">
        <div className="w-fit h-full flex justify-between items-center gap-x-5">
          <span className="title4 text-grey6">일반 쿠폰</span>
          {!isDiscountCouponAvailable && (
            <span
              className="body4 text-grey3"
              onClick={() => setIsDiscountCouponAvailable(true)} // 추후에 삭제할 로직. 지금은 UI 확인을 위해 만들어놓은 것 뿐임. 누르면 쿠폰 있다는 표시가 나타남
            >
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
