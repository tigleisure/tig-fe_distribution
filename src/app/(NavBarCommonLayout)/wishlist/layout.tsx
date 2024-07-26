import NoneArrowHeader from '@components/all/NoneArrowHeader';
import Tabs from '@components/all/Tabs/Tabs';
import TigLoadingPage from '@components/all/TigLoadingPage';
import { allleisureArray } from '@constant/constant';
import CustomSuspense from '@providers/CustomSuspense';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  const tabArray = allleisureArray;
  return (
    <div className="flex flex-col h-full pb-[54px] items-center">
      <NoneArrowHeader title="위시리스트" />
      <Tabs
        tabArray={tabArray}
        rounded
        from="wishlist"
        className="w-full px-5 top-[58px]"
      />
      <CustomSuspense fallback={<TigLoadingPage />}>{children}</CustomSuspense>
    </div>
  );
}
