'use client';
import { issueCoupon } from '@apis/djemalsvpdlwl/issusCoupon';
import { useEffect, useState } from 'react';

export default function Page() {
  const [coupon, setCoupon] = useState<string | null>(null);

  const handleClick = async () => {
    const couponCode = await issueCoupon();
    setCoupon(couponCode.result.code);
  };

  // 클립보드 복사 함수
  const copyToClipboard = () => {
    if (coupon) {
      navigator.clipboard
        .writeText(coupon)
        .then(() => {
          alert('쿠폰 코드가 클립보드에 복사되었습니다.');
        })
        .catch((err) => {
          console.error('클립보드 복사 실패', err);
        });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-grey7 title2">쿠폰 발급 페이지</h1>
      <button
        className="bg-primary_orange1 text-white p-2 rounded-lg mt-5"
        onClick={handleClick}
      >
        쿠폰 발급
      </button>
      {coupon && (
        <>
          <div className="flex items-center mt-5">{coupon}</div>
          <button onClick={copyToClipboard} className="mt-2 bg-primary_orange1 rounded-md py-1 px-4 text-white">
            복사
          </button>
        </>
      )}
    </div>
  );
}
