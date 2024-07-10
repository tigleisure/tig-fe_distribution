import BeforeSecondStageUserInfoCard from './BeforeSecondStageUserInfoCard';
import BeforeSecondStageCouponCard from './BeforeSecondStageCouponCard';
import BeforeSecondStageFinalPriceCard from './BeforeSecondStageFinalPriceCard';

interface BeforeSecondStageCardProps {
  userName: string;
  phoneNumber: string;
  couponDiscountPrice: number;
  defaultPrice: number; // 기존의 예약 금액을 의미함
}

// 추후에 백엔드 api로부터 해당 사용자가 쿠폰이 있는지 없는지를 검사하는 로직으로 상태를 설정해야함
export default function BeforeSecondStageCard({
  userName,
  phoneNumber,
  couponDiscountPrice,
  defaultPrice,
}: BeforeSecondStageCardProps) {
  return (
    <section className="w-eightNineWidth h-fit  flex flex-col gap-y-[10px] mt-[30px] mb-[30px]">
      <BeforeSecondStageUserInfoCard
        userName={userName}
        phoneNumber={phoneNumber}
      />
      <BeforeSecondStageCouponCard couponDiscountPrice={couponDiscountPrice} />
      <BeforeSecondStageFinalPriceCard
        couponDiscountPrice={couponDiscountPrice}
        defaultPrice={defaultPrice}
      />
    </section>
  );
}
