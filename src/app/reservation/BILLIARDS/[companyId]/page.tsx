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
import {
  SoccerPrice,
  useGetClubResInfo,
} from '@apis/reservation/getClubResInfo';
import { Toaster } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { addHours, formatDate } from 'date-fns';
import { timeToMinutes } from '@utils/formatDate';
import { useSelectedDate } from '@store/selectedDateStore';
import useTab from '@store/tabNumberStore';
import FootballCard from '@components/reservation/FootballCard';
import { usePriceStore } from '@store/priceStore';
import ResPeopleCountCard from '@components/reservation/ResPeopleCountCard';

export default function Page({ params }: { params: { companyId: string } }) {
  const router = useRouter();
  const { data, isSuccess } = useGetClubResInfo(params.companyId);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
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

  if (isSuccess && data?.result.category !== 'BILLIARDS') {
    router.replace('/');
  }

  useEffect(() => {
    if (isSuccess) {
      setPrice(0);
      const filteredOperatingHours = data?.result.operatingHours.filter(
        (hour) => {
          return hour.dayOfWeek === searchParam.get('dayOfWeek');
        }
      );
      setStartTime(
        data?.result.operatingHours.length !== 0
          ? filteredOperatingHours[0].startTime.slice(0, 5)
          : '10:00'
      );
      setEndTime(
        data?.result.operatingHours.length !== 0
          ? filteredOperatingHours[0].endTime.slice(0, 5)
          : '20:00'
      );
      setClubName(data?.result.clubName || '');
      setAddress(data?.result.address || '');
      setGameReservationInfo({
        ...gameReservationInfo,
        date: searchParam.get('date') || '',
      });
      setSelectedDate(searchParam.get('date') || '');
      // API 수정되면 gameType에 맞게 초기화
      setTab(data?.result.category);
    }
    // 언마운트될 때 다시 초기화
    return () => setGameReservationInfo(gameReservationInfoInitialState);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      const filteredOperatingHours = data?.result.operatingHours.filter(
        (hour) => {
          return (
            hour.dayOfWeek ===
            formatDate(new Date(selectedDate), 'EEE').toUpperCase()
          );
        }
      );
      const now = formatDate(addHours(new Date(), 1), 'HH:00');
      if (
        timeToMinutes(
          data?.result.operatingHours.length !== 0
            ? filteredOperatingHours[0].startTime.slice(0, 5) || '10:00'
            : '10:00'
        ) < timeToMinutes(now) &&
        selectedDate.slice(0, 10) === formatDate(new Date(), 'yyyy-MM-dd')
      ) {
        setStartTime(now);
      } else {
        setStartTime(
          data?.result.operatingHours.length !== 0
            ? filteredOperatingHours[0].startTime.slice(0, 5) || '20:00'
            : '20:00'
        );
      }
      setEndTime(
        data?.result.operatingHours.length !== 0
          ? filteredOperatingHours[0].endTime.slice(0, 5) || '20:00'
          : '20:00'
      );
    }
  }, [selectedDate]);

  return (
    <main className="w-full h-full overflow-y-scroll flex flex-col ">
      <Header buttonType="back" isCenter title="예약하기" />
      <ResDateCard />
      <ResGameCard startTime={startTime} endTime={endTime} />
      <ResPeopleCountCard />
      {/* <GameTypeCard /> */}
      <FootballCard prices={(data?.result.prices as SoccerPrice[]) || []} />
      <RequestCard />
      <MakeResButtonCard
        clubName={clubName}
        address={address}
        clubStartTime={startTime}
      />
      <Toaster position="bottom-center" containerStyle={{ bottom: '90px' }} />
    </main>
  );
}
