import TigLoadingPage from '@components/all/TigLoadingPage';
import { PropsWithChildren, Suspense } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <Suspense fallback={<TigLoadingPage />}>{children}</Suspense>;
}
