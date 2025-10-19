import * as PortOne from '@portone/browser-sdk/v2';
import makePaymentId from '@utils/makePaymentId';
import { instance } from '@apis/instance';
import { calculateTimeDiff } from '@utils/formatDate';
import { CustomPaymentError } from './CustomPaymentError';

interface tossEasyPayBackendResponse {
  result: {
    resultMsg: string;
    resultCode: number;
  } | null;
  resultCode: number;
  resultMsg: string;
}

const handleTossEasyPay = async (
  customPaymentId: string,
  paymentPrice: number,
  reservationData: {
    clubId: number;
    date: string;
    startTime: string;
    endTime?: string;
    gameCount?: number;
    adultCount: number;
    teenagerCount: number;
    kidsCount: number;
    userName: string;
    phoneNumber: string;
    memberId: number;
    couponId: number;
    provider: string;
    gameDescription: string;
  }
): Promise<tossEasyPayBackendResponse> => {
  const clubDataResonse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/club/guest/${reservationData.clubId}`
  );
  // TODO: 패키지 정보 추가
  const clubData = await clubDataResonse.json();
  const query = {
    clubId: reservationData.clubId.toString(),
    date: reservationData.date,
    startTime: reservationData.startTime,
    endTime: reservationData.endTime ? reservationData.endTime : '',
    gameCount: reservationData.gameCount
      ? reservationData.gameCount.toString()
      : '',
    adultCount: reservationData.adultCount.toString(),
    teenagerCount: reservationData.teenagerCount.toString(),
    kidsCount: reservationData.kidsCount.toString(),
    // paymentId: customPaymentId,
    // clubPrice: (
    //   paymentPrice /
    //   calculateTimeDiff(
    //     reservationData.endTime as string,
    //     reservationData.startTime
    //   )
    // ).toString(),
    clubPrice: clubData.result.price,
    paymentPrice: paymentPrice.toString(),
    userName: reservationData.userName,
    phoneNumber: reservationData.phoneNumber,
    couponId: reservationData.couponId.toString(),
    provider: reservationData.provider,
    gameDescription: reservationData.gameDescription,
  };

  const queryString = new URLSearchParams(query).toString();

  const response = await PortOne.requestPayment({
    storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID as string,
    channelKey: process.env.NEXT_PUBLIC_PORTONE_TOSS_EASY_PAY_CHANNEL_KEY,
    paymentId: customPaymentId,
    orderName: `${reservationData.userName}님의 티그예약`,
    totalAmount: paymentPrice,
    currency: 'CURRENCY_KRW',
    payMethod: 'EASY_PAY',
    redirectUrl: `${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}/payment/redirect?${queryString}`,
    customData: {
      clubId: reservationData.clubId,
      date: reservationData.date,
      startTime: reservationData.startTime,
      endTime: reservationData.endTime,
      gameCount: reservationData.gameCount,
      adultCount: reservationData.adultCount,
      teenagerCount: reservationData.teenagerCount,
      kidsCount: reservationData.kidsCount,
      userName: reservationData.userName,
      memberId: reservationData.memberId,
    },
  });

  // 포트원 결제 자체가 실패할 확률은 낮지만(아마 결제 자체가 안되긴 할듯), 확실하게 우리가 가진 paymentId로 결제 취소
  if (response?.code) {
    const paymentError = new Error('payment Failed') as CustomPaymentError;
    paymentError.paymentId = customPaymentId;
    paymentError.cancelReason = 'portOne 자체 결제 오류';
    throw paymentError;
  }

  const result: tossEasyPayBackendResponse = await instance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/pay/verification`,
    {
      adultCount: reservationData.adultCount,
      teenagerCount: reservationData.teenagerCount,
      kidsCount: reservationData.kidsCount,
      date: reservationData.date,
      startTime: reservationData.startTime,
      endTime: reservationData.endTime,
      gameCount: reservationData.gameCount,
      clubPrice: clubData.result.price,
      clubId: reservationData.clubId,
      paymentId: response?.paymentId,
      paymentPrice: paymentPrice,
    }
  );

  return result;
};

export default handleTossEasyPay;
