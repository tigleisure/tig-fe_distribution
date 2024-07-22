import * as PortOne from '@portone/browser-sdk/v2';
import makePaymentId from '@utils/makePaymentId';

const handleTossEasyPay = async (
  memberId: number,
  currentDateString: string,
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
) => {
  const response = await PortOne.requestPayment({
    storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID as string,
    channelKey: process.env.NEXT_PUBLIC_PORTONE_TOSS_EASY_PAY_CHANNEL_KEY,
    paymentId: makePaymentId(memberId, currentDateString),
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

  console.log(response);
};

export default handleTossEasyPay;
