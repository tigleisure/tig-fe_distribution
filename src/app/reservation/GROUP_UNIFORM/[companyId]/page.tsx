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
import { formatDate } from 'date-fns';
import { useSelectedDate } from '@store/selectedDateStore';
import useTab from '@store/tabNumberStore';
import FootballCard from '@components/reservation/FootballCard';
import { usePriceStore } from '@store/priceStore';
import ResPeopleCountCard from '@components/reservation/ResPeopleCountCard';
import ResPeopleCountDropboxCard from '@components/reservation/ResPeopleCountDropboxCard';
import ResPeriodDateCard from '@components/reservation/ResPeriodDateCard';
import InfoCard from '@components/all/InfoCard';
import TravelnfoCard from '@components/reservation/TravelInfoCard';
import DateWithReceiptTimeCard from '@components/reservation/DateWithReceiptTimeCard';
import AddressCard from '@components/reservation/AddressCard';
import { useGetPackageResInfo } from '@apis/reservation/getPackageResInfo';
import UniformCard from '@components/reservation/UniformCard';

type TravelType = '왕복' | '편도';

export default function Page({ params }: { params: { companyId: string } }) {
  const router = useRouter();
  const { data, isSuccess } = useGetPackageResInfo(params.companyId);
  const [clubName, setClubName] = useState('');
  const [address, setAddress] = useState('');
  const [travelType, setTravelType] = useState<TravelType>('왕복');
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

  if (isSuccess && data?.result.category !== 'GROUP_UNIFORM') {
    router.replace('/');
  }

  useEffect(() => {
    if (isSuccess) {
      setPrice(0);
      setClubName(data?.result.packageName || '');
      setAddress(data?.result.address || '');
      const newDate = searchParam.get('date') || '';
      setGameReservationInfo((prev) => ({ ...prev, date: newDate }));
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

  // operatingHours 의존 로직 제거됨

  return (
    <main className="w-full h-full overflow-y-scroll flex flex-col ">
      <Header buttonType="back" isCenter title="예약하기" />
      <AddressCard number={1} />
      <UniformCard prices={(data?.result.prices as any) || []} number={2} />
      <RequestCard number={3} />
      <MakeResButtonCard
        clubName={clubName}
        address={address}
        clubStartTime="10:00"
      />
      <Toaster position="bottom-center" containerStyle={{ bottom: '90px' }} />
    </main>
  );
}
