import TigLoadingPage from '@components/all/TigLoadingPage';
import CustomSuspense from '@providers/CustomSuspense';
import { PropsWithChildren, Suspense } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <CustomSuspense fallback={<TigLoadingPage />}>{children}</CustomSuspense>;
}
