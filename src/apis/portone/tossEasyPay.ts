import * as PortOne from '@portone/browser-sdk/v2';
import makePaymentId from '@utils/makePaymentId';
import { instance } from '@apis/instance';
import { calculateTimeDiff } from '@utils/formatDate';

export interface tossEasyPayBackendResponse {
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
    memberId: number;
  }
): Promise<tossEasyPayBackendResponse> => {
  const response = await PortOne.requestPayment({
    storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID as string,
    channelKey: process.env.NEXT_PUBLIC_PORTONE_TOSS_EASY_PAY_CHANNEL_KEY,
    paymentId: customPaymentId,
    orderName: '나이키 와플 트레이너 2 SD',
    totalAmount: paymentPrice,
    currency: 'CURRENCY_KRW',
    payMethod: 'CARD',
    redirectUrl: 'https://localhost/payment/redirect',
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
      clubPrice:
        paymentPrice /
        calculateTimeDiff(
          reservationData.endTime as string,
          reservationData.startTime
        ),
      clubId: reservationData.clubId,
      paymentId: response?.paymentId,
      paymentPrice: paymentPrice,
    }
  );

  return result;
};

export default handleTossEasyPay;
