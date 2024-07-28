// 해당 페이지는 결제를 하고 모바일 환경에서 redirect 되는 상황을 위해 존재
'use client';
import { useRouter } from 'next/navigation';
import { instance } from '@apis/instance';
import { useEffect } from 'react';
import { usePostReservation } from '@apis/payment/before/postReservation';
import TigLoadingPage from '@components/all/TigLoadingPage';
import cancelPortOnePayment from '@apis/portone/cancelPayment';
import { CustomPaymentError } from '@apis/portone/CustomPaymentError';

// 백엔드에 예약 정보를 paymentI와 함께 넘기고 ok면 진짜 예약을 진행하고, 결제를 취소한다.
export interface EasyPayBackendResponse {
  result: {
    resultMsg: string;
    resultCode: number;
  } | null;
  resultCode: number;
  resultMsg: string;
}

export default function PaymentRedirect({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const postReservationMutation = usePostReservation();

  const checkingReservationDataObj = {
    adultCount: searchParams.adultCount,
    teenagerCount: searchParams.teenagerCount,
    kidsCount: searchParams.kidsCount,
    date: searchParams.date,
    startTime: searchParams.startTime,
    endTime: searchParams.endTime,
    gameCount: searchParams.gameCount,
    clubPrice: searchParams.clubPrice,
    clubId: searchParams.clubId,
    paymentId: searchParams.paymentId,
    paymentPrice: searchParams.paymentPrice,
  };

  useEffect(() => {
    async function cancelPaymentWithPaymentId(paymentId: string) {
      const response = await cancelPortOnePayment(
        paymentId,
        'portOne 결제 오류로 인한 취소입니다'
      );
      console.log(response);
    }

    // 결제 실패 시
    if (searchParams.code) {
      cancelPaymentWithPaymentId(searchParams.paymentId as string);
    }

    async function sendCheckingDataToBackend() {
      const response: EasyPayBackendResponse = await instance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/pay/verification`,
        checkingReservationDataObj
      );

      if (response.resultCode === 200) {
        postReservationMutation.mutate(
          {
            adultCount: parseInt(searchParams.adultCount as string),
            teenagerCount: parseInt(searchParams.teenagerCount as string),
            kidsCount: parseInt(searchParams.kidsCount as string),
            date: searchParams.date as string,
            startTime: searchParams.startTime as string,
            endTime: (searchParams.endTime as string)
              ? (searchParams.endTime as string)
              : undefined,
            request: searchParams.request as string,
            gameCount: parseInt(searchParams.gameCount as string),
            price: parseInt(searchParams.paymentPrice as string),
            status: 'TBC',
            clubId: parseInt(searchParams.clubId as string),
            paymentId: searchParams.paymentId as string,
          },
          {
            onSuccess(data, variables, context) {
              router.replace(`/payment/after/${data.result.reservationId}`);
            },
          }
        );
      } else {
        // 백엔드에서의 검사 로직이 실패한 경우
        const paymentError = new Error(
          'Backend Verification Failed'
        ) as CustomPaymentError;
        paymentError.paymentId = searchParams.paymentId as string;
        throw paymentError;
      }
    }

    sendCheckingDataToBackend()
      .then((response) => response)
      .catch(async (error: CustomPaymentError) => {
        const response = await cancelPortOnePayment(
          error.paymentId,
          'Tig 백엔드 로직에서의 verification 오류로 인한 취소입니다'
        ); // 백엔드 검증 로직 실패 시
        console.log(response);
        router.replace('/');
      });
  }, []);
  console.log(searchParams);

  return <TigLoadingPage />;
}
