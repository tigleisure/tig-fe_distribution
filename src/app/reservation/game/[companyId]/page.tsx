'use client';

import { useEffect } from 'react';
import Header from '@components/all/Header';
import MakeResButtonCard from '@components/reservation/MakeResButtonCard';
import RequestCard from '@components/reservation/RequestCard';
import ResDateCard from '@components/reservation/ResDateCard';
import ResGameCard from '@components/reservation/ResGameCard';
import ResPeopleCountCard from '@components/reservation/ResPeopleCountCard';
import GameCountCard from '@components/reservation/GameCountCard';
import {
  useGameReservationStore,
  gameReservationInfoInitialState,
} from '@store/makeReservationInfo';

export default function Page() {
  const setGameReservationInfo = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );

  useEffect(() => {
    return () => setGameReservationInfo(gameReservationInfoInitialState);
  }, []);
  return (
    <main className="w-full h-full overflow-y-scroll flex flex-col ">
      <Header buttonType="back" isCenter title="예약하기" />
      <ResDateCard />
      <ResGameCard />
      <ResPeopleCountCard />
      <GameCountCard />
      <RequestCard />
      <MakeResButtonCard />
    </main>
  );
}
