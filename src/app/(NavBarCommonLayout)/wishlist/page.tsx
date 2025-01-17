import { getWishList } from '@apis/wishlist/getWishList';
import WishListPage from './WishListPage';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@providers/get-query-client';
import { cookies } from 'next/headers';

export default function Page() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishList(cookies().toString()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WishListPage />
    </HydrationBoundary>
  );
}

