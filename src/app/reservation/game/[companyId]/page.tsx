'use client';

import { useEffect, useState } from 'react';
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
import { useGetClubResInfo } from '@apis/reservation/getClubResInfo';

export default function Page({ params }: { params: { companyId: string } }) {
  const { data, isSuccess } = useGetClubResInfo(params.companyId);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [clubName, setClubName] = useState('');
  const [address, setAddress] = useState('');
  console.log(data);
  const setGameReservationInfo = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setStartTime(data?.result.businessHours.slice(0, 5) || '10:00');
      setEndTime(data?.result.businessHours.slice(8, 13) || '20:00');
      setClubName(data?.result.clubName || '');
      setAddress(data?.result.address || '');
    }
    // 언마운트될 때 다시 초기화
    return () => setGameReservationInfo(gameReservationInfoInitialState);
  }, [data]);
  return (
    <main className="w-full h-full overflow-y-scroll flex flex-col ">
      <Header buttonType="back" isCenter title="예약하기" />
      <ResDateCard />
      <ResGameCard startTime={startTime} endTime={endTime} />
      <ResPeopleCountCard />
      <GameCountCard />
      <RequestCard />
      <MakeResButtonCard clubName={clubName} address={address} />
    </main>
  );
}
