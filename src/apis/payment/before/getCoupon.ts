import { instance } from '@apis/instance';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { CouponResponse } from 'types/response/response';

const getCoupon = async (): Promise<CouponResponse> => {
  return instance.get('/api/v1/coupon');
};

export const useGetCoupon = () => {
  return useSuspenseQuery({
    queryKey: ['coupon'],
    queryFn: getCoupon,
  });
};
