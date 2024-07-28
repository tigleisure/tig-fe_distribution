import NoneArrowHeader from '@components/all/NoneArrowHeader';
import { PropsWithChildren } from 'react';
import TigLoadingPage from '@components/all/TigLoadingPage';
import Footer from '@components/all/Footer/Footer';
import CustomSuspense from '@providers/CustomSuspense';

export default function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-full pb-[54px] items-center">
      <NoneArrowHeader title="마이페이지" />
      <CustomSuspense fallback={<TigLoadingPage />}>{children}</CustomSuspense>
      <Footer />
    </div>
  );
}
