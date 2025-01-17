'use client';
import { useGetCoupon } from '@apis/payment/before/getCoupon';
import MypageFooter from '@components/all/Footer/MypageFooter';
import Header from '@components/all/Header';
import { CouponItem } from '@components/mypage/CouponItem';
import { CouponInput } from '@components/mypage/CouponInput';
import NonLoginIconSVG from '@public/svg/nonLogin/nonLoginIcon.svg';
import { useCouponSubmit } from '@hooks/mypage/useCouponSubmit';
import { Toaster } from 'react-hot-toast';

export default function Page() {
  const { data: couponList } = useGetCoupon();
  const { couponCode, setCouponCode, submitCoupon } = useCouponSubmit();

  if (couponList.result.length > 0) {
    return (
      <div className="bg-grey1 w-full h-[calc(100%-160px)] flex flex-col items-center overflow-y-scroll">
        <CouponInput
          couponCode={couponCode}
          onChangeCouponCode={setCouponCode}
          onSubmit={submitCoupon}
        />
        <Header buttonType="back" title="쿠폰" bgColor="grey" isCenter />
        <p className="body2 text-grey7 py-[10px] w-eightNineWidth">
          보유쿠폰{' '}
          <span className="text-primary_orange1 body2">
            {couponList.result.length}
          </span>
          장
        </p>
        <div className="w-full h-fit flex flex-col items-center pb-[100px]">
          {couponList.result.map((coupon, index) => (
            <CouponItem
              key={index}
              discount={coupon.discount}
              description={coupon.description}
              expireDate={coupon.expireDate}
              name={coupon.name}
              couponId={coupon.couponId}
            />
          ))}
        </div>
        <MypageFooter />
        <Toaster
          position="bottom-center"
          containerStyle={{ bottom: '100px' }}
        />
      </div>
    );
  }

  return (
    <div className="bg-grey1 w-full h-[calc(100%-160px)] flex flex-col items-center">
      <CouponInput
        couponCode={couponCode}
        onChangeCouponCode={setCouponCode}
        onSubmit={submitCoupon}
      />
      <Header buttonType="back" title="쿠폰" bgColor="grey" isCenter />
      <p className="body2 text-grey7 px-5 py-[10px] mt-[10px] w-full mb-[40px]">
        보유쿠폰 <span className="text-primary_orange1 body2">0</span>장
      </p>
      <NonLoginIconSVG />
      <p className="title2 text-grey4 pt-5">사용가능한 쿠폰이 없어요</p>
      <MypageFooter />
      <Toaster position="bottom-center" containerStyle={{ bottom: '100px' }} />
    </div>
  );
}
