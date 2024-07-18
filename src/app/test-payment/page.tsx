'use client';
import handleKakaokEasyPay from '@apis/portone/kakaoEasyPay';
import handleTossEasyPay from '@apis/portone/tossEasyPay';
import handlePaycoEasyPay from '@apis/portone/paycoEasyPay';
import handleInicisPay from '@apis/portone/inicisPay';

export default function TestPayment() {
  return (
    <div className="w-full flex justify-evenly items-center">
      <button
        className="w-20 h-20 bg-yellow-500"
        onClick={() => handleKakaokEasyPay(1, new Date().toISOString())}
      >
        This is kakao easy pay button
      </button>
      <button
        className="w-20 h-20 bg-blue-600"
        onClick={() => handleTossEasyPay(1, new Date().toISOString())}
      >
        This is toss easy pay button
      </button>
      <button
        className="w-20 h-20 bg-red-600"
        onClick={() => handlePaycoEasyPay(1, new Date().toISOString())}
      >
        This is payco easy pay button
      </button>
      <button
        className="w-20 h-20 bg-green-600"
        onClick={() => handleInicisPay(1, new Date().toISOString())}
      >
        This is Inicis easy pay button
      </button>
    </div>
  );
}
