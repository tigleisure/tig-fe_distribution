import NoneArrowHeader from '@components/all/NoneArrowHeader';
import TigLoadingPage from '@components/all/TigLoadingPage';
import CustomSuspense from '@providers/CustomSuspense';
import { PropsWithChildren, Suspense } from 'react';
import { cookies } from 'next/headers';
import NoLoginWishList from '@components/writing-review/NoLoginWishlist';
import Tabs from '@components/all/Tabs/Tabs';
import { allleisureArray } from '@constant/constant';
import WishListItemSkeleton from '@components/wishlist/WishListItemSkeleton';

export default function Layout({ children }: PropsWithChildren) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken) {
    return (
      <div className="flex flex-col h-full pb-[54px] items-center shadow-mainShadow">
        <NoneArrowHeader title="위시리스트" />
        <NoLoginWishList />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pb-[54px] items-center shadow-mainShadow">
      <NoneArrowHeader title="위시리스트" />
      <Suspense
        fallback={
          <div className="w-full max-h-wishListMain absolute top-[120px] pb-10 overflow-y-scroll">
            {[...Array(7)].map((_, index) => (
              <WishListItemSkeleton key={index} />
            ))}
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
