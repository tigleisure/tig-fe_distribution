import { WishListResponse } from 'types/response/response';

export const getWishList = async (
  cookie?: string
): Promise<WishListResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/wishlist`,
    {
      headers: {
        Cookie: cookie ?? '',
      },
      cache: 'no-store',
    }
  );
  return res.json();
};

// export const useGetWishList = () => {
//   return useSuspenseQuery({
//     queryKey: ['wishlist'],
//     queryFn: getWishList,
//   });
// };
