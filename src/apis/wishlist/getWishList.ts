import { useQuery } from '@tanstack/react-query';
import { WishListResponse } from 'types/response/response';

export const getWishList = async (): Promise<WishListResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/wishlist`,
    {
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }

  const data: WishListResponse = await response.json();
  return data;
};

export const useGetWishList = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishList,
  });
};
