import NoneArrowHeader from '@components/all/NoneArrowHeader';
import { PropsWithChildren } from 'react';
import TigLoadingPage from '@components/all/TigLoadingPage';
import CustomSuspense from '@providers/CustomSuspense';
import MypageFooter from '@components/all/Footer/MypageFooter';

export default function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-full pb-[54px] items-center">
      <NoneArrowHeader title="마이페이지" />
      <CustomSuspense fallback={<TigLoadingPage />}>{children}</CustomSuspense>
      <MypageFooter />
    </div>
  );
}
