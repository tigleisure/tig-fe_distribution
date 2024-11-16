import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CouponIssueResponse } from 'types/response/response';

const postCoupon = async ({
  couponId,
}: {
  couponId: string;
}): Promise<CouponIssueResponse> => {
  return instance.post(`/api/v1/coupon/register`, { couponId });
};

export const usePostCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupon'] });
    },
  });
};
