import BeforeSecondStageUserInfoCard from './BeforeSecondStageUserInfoCard';
import BeforeSecondStageCouponCard from './BeforeSecondStageCouponCard';
import BeforeSecondStageFinalPriceCard from './BeforeSecondStageFinalPriceCard';
import BeforeSecondStagePaymentSelectionCard from './BeforeSecondStagePaymentSelectionCard';
import Footer from '@components/all/Footer/Footer';

interface BeforeSecondStageCardProps {
  userName: string;
  phoneNumber: string;
  couponDiscountPrice: number;
  price: number; // 기존의 예약 금액을 의미함
  paymentMethod: 'kakaoPayment' | 'tossAndCardPayment' | null;
}

// 추후에 백엔드 api로부터 해당 사용자가 쿠폰이 있는지 없는지를 검사하는 로직으로 상태를 설정해야함
export default function BeforeSecondStageCard({
  userName,
  phoneNumber,
  couponDiscountPrice,
  price,
  paymentMethod,
}: BeforeSecondStageCardProps) {
  return (
    <section className="w-eightNineWidth h-fit  flex flex-col gap-y-[10px] mt-[30px]">
      <BeforeSecondStageUserInfoCard
        userName={userName}
        phoneNumber={phoneNumber}
      />
      <BeforeSecondStageCouponCard couponDiscountPrice={couponDiscountPrice} />
      <BeforeSecondStagePaymentSelectionCard paymentMethod={paymentMethod} />
      <BeforeSecondStageFinalPriceCard
        couponDiscountPrice={couponDiscountPrice}
        defaultPrice={price}
      />
      <Footer />
    </section>
  );
}
