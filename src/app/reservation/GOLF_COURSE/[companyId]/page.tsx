'use client';

import { useEffect, useState } from 'react';
import Header from '@components/all/Header';
import MakeResButtonCard from '@components/reservation/MakeResButtonCard';
import RequestCard from '@components/reservation/RequestCard';
import ResDateCard from '@components/reservation/ResDateCard';
import ResGameCard from '@components/reservation/ResGameCard';
import {
  useGameReservationStore,
  gameReservationInfoInitialState,
} from '@store/makeReservationInfo';
import { Toaster } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelectedDate } from '@store/selectedDateStore';
import useTab from '@store/tabNumberStore';
import FootballCard from '@components/reservation/FootballCard';
import { usePriceStore } from '@store/priceStore';
import ResPeopleCountCard from '@components/reservation/ResPeopleCountCard';
import { useGetPackageResInfo } from '@apis/reservation/getPackageResInfo';
import GolfCourseCard from '@components/reservation/GolfCourseCard';

export default function Page({ params }: { params: { companyId: string } }) {
  const router = useRouter();
  const { data, isSuccess } = useGetPackageResInfo(params.companyId);
  console.log(data);
  const [clubName, setClubName] = useState('');
  const [address, setAddress] = useState('');
  const searchParam = useSearchParams();
  const selectedDate = useSelectedDate((state) => state.selectedDate);
  const setSelectedDate = useSelectedDate((state) => state.setSelectedDate);
  const gameReservationInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const setGameReservationInfo = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );
  const setTab = useTab((state) => state.setSelectedTab);
  const setPrice = usePriceStore((state) => state.setPrice);

  if (isSuccess && data?.result.category !== 'GOLF_COURSE') {
    router.replace('/');
  }

  useEffect(() => {
    if (isSuccess) {
      setPrice(0);
      setClubName(data?.result.packageName || '');
      setAddress(data?.result.address || '');
      const newDate = searchParam.get('date') || '';
      setGameReservationInfo((prev) =>
        prev.date === newDate ? prev : { ...prev, date: newDate }
      );
      setSelectedDate(newDate);
      // API 수정되면 gameType에 맞게 초기화
      setTab(data?.result.category);
    }
    // 언마운트될 때 다시 초기화
    return () => setGameReservationInfo(gameReservationInfoInitialState);
  }, [
    data,
    isSuccess,
    searchParam,
    setGameReservationInfo,
    setPrice,
    setSelectedDate,
    setTab,
  ]);

  return (
    <main className="w-full h-full overflow-y-scroll flex flex-col ">
      <Header buttonType="back" isCenter title="예약하기" />
      <ResDateCard />
      <ResGameCard startTime="10:00" endTime="20:00" />
      <ResPeopleCountCard />
      {/* <GameTypeCard /> */}
      <GolfCourseCard
        prices={(data?.result.prices as any) || []}
        from={'package'}
      />
      <RequestCard number={1} />
      <MakeResButtonCard
        clubName={clubName}
        address={address}
        clubStartTime="10:00"
        from={'package'}
      />
      <Toaster position="bottom-center" containerStyle={{ bottom: '90px' }} />
    </main>
  );
}
