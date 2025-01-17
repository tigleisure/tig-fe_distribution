import TigLoadingPage from '@components/all/TigLoadingPage';
import CustomSuspense from '@providers/CustomSuspense';
import { PropsWithChildren } from 'react';

export default function Page({ children }: PropsWithChildren) {
  return (
    <CustomSuspense fallback={<TigLoadingPage />}>{children}</CustomSuspense>
  );
}
