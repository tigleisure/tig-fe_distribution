import { instance } from '@apis/instance';
import { IssueCouponResponse } from 'types/response/response';

export const issueCoupon = async (): Promise<IssueCouponResponse> => {
  return instance.get(`/api/v1/coupon/issue`);
};
