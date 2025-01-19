import { PropsWithChildren, Suspense } from 'react';
import NoneArrowHeader from '@components/all/NoneArrowHeader';

export default function ReservationListLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex flex-col h-full pb-[54px] items-center">
        <NoneArrowHeader title="예약내역" />
        {children}
      </div>
    </>
  );
}
