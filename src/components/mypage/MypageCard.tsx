import CouponSVG from '@public/svg/mypage/coupon.svg';
import ReviewSVG from '@public/svg/mypage/review.svg';
import Link from 'next/link';

interface MypageCardProps {
  isCoupon: boolean;
}

export default function MypageCard({ isCoupon }: MypageCardProps) {
  return (
    <Link
      className="w-6/12 flex flex-col gap-[2px] items-center justify-center h-full cursor-pointer"
      href={isCoupon ? '/mypage/coupon' : '/mypage/review'}
    >
      {isCoupon ? <CouponSVG /> : <ReviewSVG />}
      <p className="body4 text-grey5">{isCoupon ? '쿠폰' : '리뷰'}</p>
      <p className="title3 text-grey7">2</p>
    </Link>
  );
}
