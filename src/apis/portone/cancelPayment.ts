// https://developers.portone.io/api/rest-v2/payment#post%20%2Fpayments%2F%7BpaymentId%7D%2Fcancel
// 위의 문서 참고

interface cancelRequestProp {
  storeId: string;
  amount?: number;
  taxFreeAmount?: number;
  vatAmount?: number;
  reason: string;
}

interface cancelPortoneResponseProp {
  status: 'FAILED' | 'REQUESTED' | 'SUCCEEDED';
  id: string; // 취소 내역 ID
  totalAmount: number;
  taxFreeAmount: number;
  vatAmount: number;
  reason: string;
}

const cancelPortOnePayment = async (paymentId: string) => {
  const cancleRequestData: cancelRequestProp = {
    storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID as string,
    reason: '고객의 TIG 사이트를 통한 체험 프로그램 예약 취소입니다', // 이거 말고 딱히 쓸 말이 없는듯? 아니면 고객한테 사유도 입력 받아야함
  };

  const response = await fetch(
    `https://api.portone.io/payments/${paymentId}/cancel`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${process.env.NEXT_PUBLIC_PORTONE_API_SECRET_KEY}`,
      },
      body: JSON.stringify(cancleRequestData),
    }
  );

  const responseData: cancelPortoneResponseProp = await response.json();

  if (responseData.status === 'FAILED') {
    // 결제취소 실패 로직
  } else if (responseData.status === 'REQUESTED') {
    // 결제 취소 진행중 로직
  } else if (responseData.status === 'SUCCEEDED') {
    // 결제취소 성공 로직, 여기에서 백엔드로 우리 서비스 단의 예약 취소가 이루어지면 됨ㄴ
  }
  // 일단 결제 응답만 반환한 뒤, redirect 페이지나 FullButton 컴포넌트에서 예약 취소를 진행
  return responseData;
};

export default cancelPortOnePayment;
