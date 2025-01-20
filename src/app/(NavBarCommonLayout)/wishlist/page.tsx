import { getWishList } from '@apis/wishlist/getWishList';
import WishListPage from './WishListPage';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@providers/get-query-client';
import { cookies } from 'next/headers';

// dynamic = 'force-dynamic' 설정을 추가하여 페이지가 항상 동적으로 렌더링되도록 합니다
export const dynamic = 'force-dynamic';

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishList(cookies().toString()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WishListPage />
    </HydrationBoundary>
  );
}
