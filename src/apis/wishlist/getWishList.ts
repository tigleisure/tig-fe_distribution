import { WishListResponse } from 'types/response/response';

export const getWishList = async (
  cookies: string
): Promise<WishListResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/wishlist`,
    {
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies,
      },
      credentials: 'include',
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }

  return response.json();
};

// export const useGetWishList = () => {
//   return useSuspenseQuery({
//     queryKey: ['wishlist'],
//     queryFn: getWishList,
//   });
// };
