'use client';
import { useState } from 'react';
import { usePostCoupon } from '@apis/mypage/postCoupon';
import { useToast } from '@hooks/common/useToast';

export const useCouponSubmit = () => {
  const [couponCode, setCouponCode] = useState('');
  const { mutate } = usePostCoupon();
  const { showToast } = useToast();

  const submitCoupon = () => {
    mutate(
      { couponId: couponCode },
      {
        onSuccess(data) {
          if (data.resultCode === 200) {
            showToast('쿠폰이 등록되었어요');
          } else {
            showToast('유효하지 않은 쿠폰 번호에요', true);
          }
          setCouponCode('');
        },
      }
    );
  };

  return {
    couponCode,
    setCouponCode,
    submitCoupon,
  };
};
