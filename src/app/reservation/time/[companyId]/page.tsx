'use client';

import { useEffect } from 'react';
import Header from '@components/all/Header';
import MakeResButtonCard from '@components/reservation/MakeResButtonCard';
import RequestCard from '@components/reservation/RequestCard';
import ResDateCard from '@components/reservation/ResDateCard';
import ResPeopleCountCard from '@components/reservation/ResPeopleCountCard';
import ResReservationCard from '@components/reservation/ResReservationCard';
import RestimeCard from '@components/reservation/RestimeCard';
import {
  timeReservationInfoInitialState,
  useTimeReservationStore,
} from '@store/makeReservationInfo';

const DUMMYPRICE = '10,000';

export default function Page() {
  const setTimeReservationInfo = useTimeReservationStore(
    (state) => state.setTimeReservationInfo
  );

  useEffect(() => {
    // 언마운트될 때 다시 초기화
    return () => setTimeReservationInfo(timeReservationInfoInitialState);
  }, []);
  return (
    <main className="w-full h-full overflow-y-scroll flex flex-col ">
      <Header buttonType="back" isCenter title="예약하기" />
      <ResDateCard />
      <RestimeCard />
      <ResPeopleCountCard />
      <RequestCard />
      <MakeResButtonCard />
    </main>
  );
}
