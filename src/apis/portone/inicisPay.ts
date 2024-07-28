import * as PortOne from '@portone/browser-sdk/v2';
import makePaymentId from '@utils/makePaymentId';

const handleInicisPay = async (memberId: number, currentDateString: string) => {
  const response = await PortOne.requestPayment({
    storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID as string,
    channelKey: process.env.NEXT_PUBLIC_PORTONE_INICIS_CHANNEL_KEY,
    paymentId: makePaymentId(memberId, currentDateString),
    orderName: '나이키 와플 트레이너 2 SD',
    totalAmount: 1000, // 이니시스는 1000원 미만 결제 안됨
    currency: 'CURRENCY_KRW',
    payMethod: 'CARD',
    customer: {
      fullName: '포트원',
      phoneNumber: '010-0000-1234',
      email: 'test@portone.io',
    },
    redirectUrl: 'https://localhost/payment/redirect',
  });
};

export default handleInicisPay;
