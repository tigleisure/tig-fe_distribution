import { instance } from '@apis/instance';
import { useQuery } from '@tanstack/react-query';
import { WishListResponse } from 'types/response/response';

export const getWishList = async (): Promise<WishListResponse> => {
  return instance.get('/api/v1/wishlist');
};

export const useGetWishList = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishList,
  });
};
