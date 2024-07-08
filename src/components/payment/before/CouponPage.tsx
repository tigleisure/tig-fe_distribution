'use client';
import useCoupon from '@store/couponStore';
import Header from '@components/all/Header';

export default function CouponPage() {
  const couponList = useCoupon((state) => state.couponList);
  const setCouponList = useCoupon((state) => state.setCouponList);
  return (
    <main className="bg-grey1">
      <Header buttonType="back" isCenter={false} title="쿠폰" bgColor="grey" />
    </main>
  );
}
