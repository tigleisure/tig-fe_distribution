'use client';
import { cn } from '@utils/cn';
import { useRouter } from 'next/navigation';
import useReservationStage from '@store/reservationStageStore';
import {
  usePaymentFirstStage,
  usePaymentSecondStage,
} from '@store/paymentInfoStore';
import {
  useIsCouponPageOpen,
  useSelectedCouponNumber,
} from '@store/couponStore';
import useModal from '@store/modalStore';
import { isValidPhoneNumber } from '@utils/validationCheck';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { ButtonMouseEvent } from 'types/all/FullButtonTypes';
import handleKakaokEasyPay from '@apis/portone/kakaoEasyPay';
import handleTossEasyPay from '@apis/portone/tossEasyPay';
import { useGetUserInfo } from '@apis/mypage/getUserInfo';
import { usePostReservation } from '@apis/payment/before/postReservation';
import makePaymentId from '@utils/makePaymentId';
import { CustomPaymentError } from '@apis/portone/CustomPaymentError';
import cancelPortOnePayment from '@apis/portone/cancelPayment';
import ToastUI, { toastUIDuration } from './ToastUI';
import { stat } from 'fs';
import { se } from 'date-fns/locale';

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
    reservationId?: number | null;
    selectedCouponPrice?: number;
    reservationData?: {
      clubId: number;
      memberId: number;
    };
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

  const selectedCouponNumber = useSelectedCouponNumber(
    (state) => state.selectedCouponNumber
  );

  const [toastId, setToastId] = useState<string | null>(null);

  const { data } = useGetUserInfo();
  const postReservationMutation = usePostReservation();

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
      if (
        secondStageInfoObject.phoneNumber === '' ||
        secondStageInfoObject.userName === ''
      ) {
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

      if (secondStageInfoObject.paymentMethod === null) {
        if (toastId !== null) {
          toast.remove(toastId);
        }
        const id = toast.custom(
          <ToastUI message="결제 수단을 선택해주세요." iswarning={true} />,
          {
            duration: toastUIDuration,
          }
        );

        setToastId(id);
        return;
      }

      // 이제 해당 정보를 백엔드로 전송하면 됨

      // 0원 결제인 경우 포트원 결제 없이 진행
      if (
        secondStageInfoObject.price -
          secondStageInfoObject.couponDiscountPrice <=
          0 &&
        data &&
        sendingData?.reservationData?.clubId &&
        sendingData.reservationData.memberId
      ) {
        console.log('0원 결제');
        const customPaymentId = makePaymentId(
          data.result.id,
          new Date().toLocaleString()
        );

        postReservationMutation.mutate(
          {
            adultCount: firstStageInfoObject.adultCount,
            teenagerCount: firstStageInfoObject.teenagerCount,
            kidsCount: firstStageInfoObject.kidsCount,
            date: firstStageInfoObject.date,
            startTime: firstStageInfoObject.startTime,
            endTime:
              firstStageInfoObject.endTime !== ''
                ? firstStageInfoObject.endTime
                : undefined,
            gameCount: firstStageInfoObject.gameCount,
            message: firstStageInfoObject.message,
            price:
              secondStageInfoObject.price -
              secondStageInfoObject.couponDiscountPrice,
            status: 'TBC',
            clubId: sendingData.reservationData?.clubId as number,
            paymentId: customPaymentId,
            phoneNumber: secondStageInfoObject.phoneNumber,
            userName: secondStageInfoObject.userName,
            gameDescription: firstStageInfoObject.message,
            couponId: selectedCouponNumber,
            provider: secondStageInfoObject.paymentMethod === 'kakaoPayment' ? 'KAKAOPAY' : 'TOSSPAY'
          },
          {
            onSuccess(data) {
              // 현재 data가 null값이 오는 중

              router.replace(`/payment/after/${data.result.reservationId}`);
            },
          }
        );
        return;
      }

      if (
        secondStageInfoObject.paymentMethod === 'kakaoPayment' &&
        data &&
        sendingData?.reservationData?.clubId &&
        sendingData.reservationData.memberId
      ) {
        const customPaymentId = makePaymentId(
          data.result.id,
          new Date().toLocaleString()
        );

        handleKakaokEasyPay(
          customPaymentId,
          secondStageInfoObject.price -
            secondStageInfoObject.couponDiscountPrice,
          {
            clubId: sendingData?.reservationData?.clubId,
            date: firstStageInfoObject.date,
            startTime: firstStageInfoObject.startTime,
            endTime: firstStageInfoObject.endTime,
            gameCount: firstStageInfoObject.gameCount,
            adultCount: firstStageInfoObject.adultCount,
            teenagerCount: firstStageInfoObject.teenagerCount,
            kidsCount: firstStageInfoObject.kidsCount,
            userName: secondStageInfoObject.userName,
            phoneNumber: secondStageInfoObject.phoneNumber,
            memberId: sendingData.reservationData.memberId,
            couponId: selectedCouponNumber,
            gameDescription: firstStageInfoObject.message,
            provider: secondStageInfoObject.paymentMethod
          }
        )
          .then((response) => {
            if (response.resultCode === 200) {
              postReservationMutation.mutate(
                {
                  adultCount: firstStageInfoObject.adultCount,
                  teenagerCount: firstStageInfoObject.teenagerCount,
                  kidsCount: firstStageInfoObject.kidsCount,
                  date: firstStageInfoObject.date,
                  startTime: firstStageInfoObject.startTime,
                  endTime:
                    firstStageInfoObject.endTime !== ''
                      ? firstStageInfoObject.endTime
                      : undefined,
                  gameCount: firstStageInfoObject.gameCount,
                  message: firstStageInfoObject.message,
                  price:
                    secondStageInfoObject.price -
                      secondStageInfoObject.couponDiscountPrice >
                    0
                      ? secondStageInfoObject.price -
                        secondStageInfoObject.couponDiscountPrice
                      : 0,
                  status: 'TBC',
                  clubId: sendingData.reservationData?.clubId as number,
                  paymentId: customPaymentId,
                  phoneNumber: secondStageInfoObject.phoneNumber,
                  userName: secondStageInfoObject.userName,
                  gameDescription: firstStageInfoObject.message,
                  couponId: selectedCouponNumber,
                  provider: 'KAKAOPAY'
                },
                {
                  onSuccess(data) {
                    // 현재 data가 null값이 오는 중

                    router.replace(
                      `/payment/after/${data.result.reservationId}`
                    );
                  },
                }
              );
            } else {
              // 백엔드에서의 검증 로직이 실패한 경우
              const paymentError = new Error(
                'Backend Verification Failed'
              ) as CustomPaymentError;
              paymentError.paymentId = customPaymentId;
              paymentError.cancelReason =
                'Tig 백엔드 로직에서의 verification 오류로 인한 취소입니다';
              throw paymentError;
            }
          })
          .catch(async (error: CustomPaymentError) => {
            if (error.cancelReason.trim() !== 'portOne 자체 결제 오류') {
              const response = await cancelPortOnePayment(
                error.paymentId,
                error.cancelReason
              );
              router.replace('/');
            }
          });
      }

      if (
        secondStageInfoObject.paymentMethod === 'tossAndCardPayment' &&
        data &&
        sendingData?.reservationData?.clubId &&
        sendingData.reservationData.memberId
      ) {
        const customPaymentId = makePaymentId(
          data.result.id,
          new Date().toLocaleString()
        );
        handleTossEasyPay(
          customPaymentId,
          secondStageInfoObject.price -
            secondStageInfoObject.couponDiscountPrice,
          {
            clubId: sendingData?.reservationData?.clubId,
            date: firstStageInfoObject.date,
            startTime: firstStageInfoObject.startTime,
            endTime: firstStageInfoObject.endTime,
            gameCount: firstStageInfoObject.gameCount,
            adultCount: firstStageInfoObject.adultCount,
            teenagerCount: firstStageInfoObject.teenagerCount,
            kidsCount: firstStageInfoObject.kidsCount,
            userName: secondStageInfoObject.userName,
            memberId: sendingData.reservationData.memberId,
            phoneNumber: secondStageInfoObject.phoneNumber,
            couponId: selectedCouponNumber,
            gameDescription: firstStageInfoObject.message,
            provider: secondStageInfoObject.paymentMethod
          }
        )
          .then((response) => {
            if (response.resultCode === 200) {
              postReservationMutation.mutate(
                {
                  adultCount: firstStageInfoObject.adultCount,
                  teenagerCount: firstStageInfoObject.teenagerCount,
                  kidsCount: firstStageInfoObject.kidsCount,
                  date: firstStageInfoObject.date,
                  startTime: firstStageInfoObject.startTime,
                  endTime:
                    firstStageInfoObject.endTime !== ''
                      ? firstStageInfoObject.endTime
                      : undefined,
                  gameCount: firstStageInfoObject.gameCount,
                  message: firstStageInfoObject.message,
                  price:
                    secondStageInfoObject.price -
                      secondStageInfoObject.couponDiscountPrice >
                    0
                      ? secondStageInfoObject.price -
                        secondStageInfoObject.couponDiscountPrice
                      : 0,
                  status: 'TBC',
                  clubId: sendingData.reservationData?.clubId as number,
                  paymentId: customPaymentId,
                  phoneNumber: secondStageInfoObject.phoneNumber,

                  userName: secondStageInfoObject.userName,
                  gameDescription: firstStageInfoObject.message,
                  couponId: selectedCouponNumber,
                  provider: 'TOSSPAY'
                },
                {
                  onSuccess(data) {
                    router.replace(
                      `/payment/after/${data.result.reservationId}`
                    );
                  },
                }
              );
            } else {
              // 백엔드에서의 검증 로직이 실패한 경우
              const paymentError = new Error(
                'Backend Verification Failed'
              ) as CustomPaymentError;
              paymentError.paymentId = customPaymentId;
              paymentError.cancelReason =
                'Tig 백엔드 로직에서의 verification 오류로 인한 취소입니다';
              throw paymentError;
            }
          })
          .catch(async (error: CustomPaymentError) => {
            if (error.cancelReason.trim() !== 'portOne 자체 결제 오류') {
              const response = await cancelPortOnePayment(
                error.paymentId,
                error.cancelReason
              );
              router.replace('/');
            }
          });
      }
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
