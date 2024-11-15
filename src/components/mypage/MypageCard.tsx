import { useGetCoupon } from '@apis/payment/before/getCoupon';
import { useGetReservationList } from '@apis/reservation-list/getUserReservationList';
import CouponSVG from '@public/svg/mypage/coupon.svg';
import ReviewSVG from '@public/svg/mypage/review.svg';
import Link from 'next/link';

interface MypageCardProps {
  isCoupon: boolean;
}

export default function MypageCard({ isCoupon }: MypageCardProps) {
  const { data: couponList } = useGetCoupon();
  const { data } = useGetReservationList();
  const reservationList = data.result.filter(
    (reservationItem) =>
      reservationItem.status === 'DONE' || reservationItem.status === 'REVIEWED'
  );
  return (
    <Link
      className="w-6/12 flex flex-col gap-[2px] items-center justify-center h-full cursor-pointer"
      href={isCoupon ? '/mypage/coupon' : '/mypage/review'}
    >
      {isCoupon ? <CouponSVG /> : <ReviewSVG />}
      <p className="body4 text-grey5">{isCoupon ? '쿠폰' : '리뷰'}</p>
      <p className="title3 text-grey7">
        {isCoupon ? couponList.result.length : reservationList.length}
      </p>
    </Link>
  );
}
