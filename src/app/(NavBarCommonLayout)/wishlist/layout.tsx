import NoneArrowHeader from '@components/all/NoneArrowHeader';
import TigLoadingPage from '@components/all/TigLoadingPage';
import CustomSuspense from '@providers/CustomSuspense';
import { PropsWithChildren } from 'react';
import { cookies } from 'next/headers';
import NoLoginWishList from '@components/writing-review/NoLoginWishlist';

export default function Layout({ children }: PropsWithChildren) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken) {
    return <NoLoginWishList />;
  }

  return (
    <div className="flex flex-col h-full pb-[54px] items-center">
      <NoneArrowHeader title="위시리스트" />
      <CustomSuspense fallback={<TigLoadingPage />}>{children}</CustomSuspense>
    </div>
  );
}
