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

type TravelType = '왕복' | '편도';

export default function Page({ params }: { params: { companyId: string } }) {
  const router = useRouter();
  const { data, isSuccess } = useGetPackageResInfo(params.companyId);
  const [clubName, setClubName] = useState('');
  const [address, setAddress] = useState('');
  const [travelType, setTravelType] = useState<TravelType>('왕복');
  const searchParam = useSearchParams();
  const setPrice = usePriceStore((state) => state.setPrice);
  const selectedDate = useSelectedDate((state) => state.selectedDate);
  const setSelectedDate = useSelectedDate((state) => state.setSelectedDate);
  const gameReservationInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const setGameReservationInfo = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );
  const setTab = useTab((state) => state.setSelectedTab);

  if (isSuccess && data?.result.category !== 'LUNCH_BOX') {
    router.replace('/');
  }

  useEffect(() => {
    if (isSuccess) {
      setPrice(2 * (data?.result.prices[0].price || 0));
      setClubName(data?.result.packageName || '');
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

  // operatingHours 기반 시간 계산 로직 제거됨

  return (
    <main className="w-full h-full overflow-y-scroll flex flex-col ">
      <Header buttonType="back" isCenter title="예약하기" />
      <DateWithReceiptTimeCard />
      <AddressCard />
      <ResPeopleCountDropboxCard
        number={3}
        from="LUNCH_BOX"
        price={data?.result.prices[0].price || 12000}
      />
      <RequestCard number={4} />
      <MakeResButtonCard
        clubName={clubName}
        address={address}
        clubStartTime="10:00"
      />
      <Toaster position="bottom-center" containerStyle={{ bottom: '90px' }} />
    </main>
  );
}
