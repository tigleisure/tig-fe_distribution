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
    return <NoLoginWishList />;
  }

  return (
    <div className="flex flex-col h-full pb-[54px] items-center">
      <NoneArrowHeader title="위시리스트" />
      <Tabs
        tabArray={allleisureArray}
        rounded
        from="wishlist"
        className="w-full px-5 top-[58px]"
      />
      <Suspense
        fallback={
          <div className="w-full max-h-wishListMain absolute top-[120px] pb-10 overflow-y-scroll">
            {[...Array(5)].map((_, index) => (
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
