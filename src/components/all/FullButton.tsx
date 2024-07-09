'use client';
import { cn } from '@utils/cn';
import { useRouter } from 'next/navigation';
import useReservationStage from '@store/reservationStageStore';
import { usePaymentSecondStage } from '@store/paymentInfoStore';
import { useIsCouponPageOpen } from '@store/couponStore';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'sm' | 'md' | 'lg';
  color:
    | 'status_red1'
    | 'primary_orange1'
    | 'white'
    | 'grey5'
    | 'black'
    | 'grey4';
  bgColor:
    | 'primary_orange1'
    | 'primary_orange2'
    | 'black'
    | 'grey2'
    | 'grey3'
    | 'white'
    | 'status_red1'
    | 'status_red1_opacity';
  content: string;
  className?: string;
  clickTask?:
    | 'move-to-writing-review-page'
    | 'move-to-written-review-page'
    | 'move-to-home-page'
    | 'move-to-second-payment-stage'
    | 'apply-coupon';
  sendingData?: {
    reviewId?: number;
    reservationId?: number;
    selectedCouponPrice?: number;
  };
}

export default function FullButton({
  size,
  color,
  bgColor,
  content,
  className,
  clickTask,
  sendingData,
  ...props
}: ButtonProps) {
  const router = useRouter();
  const setReservationStageStatus = useReservationStage(
    (state) => state.setReservationStage
  );
  const secondStageInfoObject = usePaymentSecondStage(
    (state) => state.secondStageInfoObject
  );

  const setSecondStageInfoObject = usePaymentSecondStage(
    (state) => state.setSecondStageInfoObject
  );

  const setIsCouponPageOpen = useIsCouponPageOpen(
    (state) => state.setIsCouponPageOpen
  );

  const colorClasses = {
    status_red1: 'text-status_red1',
    primary_orange1: 'text-primary_orange1',
    white: 'text-white',
    grey5: 'text-grey5',
    black: 'text-black',
    grey4: 'text-grey4',
  };

  const bgColorClasses = {
    primary_orange1: 'bg-primary_orange1',
    primary_orange2: 'bg-primary_orange2',
    black: 'bg-black',
    grey2: 'bg-grey2',
    grey3: 'bg-grey3',
    white: 'bg-white',
    status_red1: 'bg-status_red1',
    status_red1_opacity: 'bg-[#fdeeed]',
  };
  function handleClickFullButton(ev: any) {
    if (clickTask === 'move-to-writing-review-page') {
      ev.stopPropagation();
      ev.preventDefault();
      router.push(`/writing-review/${sendingData?.reservationId}`);
      return;
    }

    if (clickTask === 'move-to-written-review-page') {
      ev.stopPropagation();
      ev.preventDefault();
      router.push(`/reservation-list/review/${sendingData?.reviewId}`);
      return;
    }
    if (clickTask === 'move-to-home-page') {
      router.push('/');
      return;
    }
    if (clickTask === 'move-to-second-payment-stage') {
      setReservationStageStatus(2);
      return;
    }

    if (clickTask === 'apply-coupon') {
      setSecondStageInfoObject({
        ...secondStageInfoObject,
        couponDiscountPrice: sendingData?.selectedCouponPrice as number,
      });
      setIsCouponPageOpen(false);
      return;
    }
  }

  return (
    <button
      onClick={(ev) => handleClickFullButton(ev)}
      className={cn(
        `w-full flex justify-center items-center rounded-md`,
        {
          'body4 h-[37px]': size === 'sm',
          'title3 h-[44px]': size === 'md',
          'title3 h-[50px]': size === 'lg',
          [colorClasses[color]]: color,
          [bgColorClasses[bgColor]]: bgColor,
        },
        className
      )}
      {...props}
    >
      {content}
    </button>
  );
}
