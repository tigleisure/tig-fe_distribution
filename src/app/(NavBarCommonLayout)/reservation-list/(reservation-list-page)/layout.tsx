import { PropsWithChildren, Suspense } from 'react';
import NoneArrowHeader from '@components/all/NoneArrowHeader';
import TigLoadingPage from '@components/all/TigLoadingPage';
import CustomSuspense from '@providers/CustomSuspense';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export default function ReservationListLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex flex-col h-full pb-[54px] items-center">
        <NoneArrowHeader title="예약내역" />
        <CustomSuspense fallback={<TigLoadingPage />}>
          {children}
        </CustomSuspense>
      </div>
    </>
  );
}
