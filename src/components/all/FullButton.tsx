'use client';
import { cn } from '@utils/cn';
import { useRouter } from 'next/navigation';
import useReservationStage from '@store/reservationStageStore';
import {
  usePaymentFirstStage,
  usePaymentSecondStage,
} from '@store/paymentInfoStore';
import { useIsCouponPageOpen } from '@store/couponStore';
import useModal from '@store/modalStore';
import { isValidPhoneNumber } from '@utils/validationCheck';
import toast from 'react-hot-toast';
import ToastUI, { toastUIDuration } from '@components/mypage/ToastUI';
import { useEffect, useState } from 'react';
import { ButtonMouseEvent } from 'types/all/FullButtonTypes';
import handleKakaokEasyPay from '@apis/portone/kakaoEasyPay';
import handleTossEasyPay from '@apis/portone/tossEasyPay';
import { useGetUserInfo } from '@apis/mypage/getUserInfo';
import { da } from 'date-fns/locale';

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
    | 'apply-coupon'
    | 'cancel-reservation'
    | 'request-payment';
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

  const firstStageInfoObject = usePaymentFirstStage(
    (state) => state.firstStageInfoObject
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

  const setSelectedIsModalOpen = useModal(
    (state) => state.setSelectedIsModalOpen
  );

  const [toastId, setToastId] = useState<string | null>(null);

  const { data } = useGetUserInfo();

  console.log(data);

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
  function handleClickFullButton(ev: ButtonMouseEvent) {
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
      router.replace('/');
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

    if (clickTask === 'cancel-reservation') {
      setSelectedIsModalOpen(true);
      ev.stopPropagation();
      ev.preventDefault();
    }

    if (clickTask === 'request-payment') {
      if (secondStageInfoObject.phoneNumber === '') {
        setSelectedIsModalOpen(true);
        return;
      }
      if (!isValidPhoneNumber(secondStageInfoObject.phoneNumber)) {
        if (toastId !== null) {
          toast.remove(toastId);
        }
        const id = toast.custom(
          <ToastUI message="올바른 전화 번호가 아닙니다." iswarning={true} />,
          {
            duration: toastUIDuration,
          }
        );

        setToastId(id);
        return;
      }
      // 이제 해당 정보를 백엔드로 전송하면 됨

      if (secondStageInfoObject.paymentMethod === 'kakaoPayment' && data) {
        handleKakaokEasyPay(
          data.result.id,
          new Date().toLocaleString(),
          secondStageInfoObject.price -
            secondStageInfoObject.couponDiscountPrice
        );
      }

      if (
        secondStageInfoObject.paymentMethod === 'tossAndCardPayment' &&
        data
      ) {
        handleTossEasyPay(
          data.result.id,
          new Date().toLocaleString(),
          secondStageInfoObject.price -
            secondStageInfoObject.couponDiscountPrice
        );
      }

      // 백엔드 전송 로직
      // 실제로는 companyId를 다음 주소로 넘겨야함
      // router.replace(`/payment/after/${firstStageInfoObject.clubName}`);
    }
  }

  return (
    <button
      onClick={(ev: ButtonMouseEvent) => handleClickFullButton(ev)}
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
