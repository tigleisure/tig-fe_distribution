'use client';
import FullButton from '@components/all/FullButton';
import ToastUI, { toastUIDuration } from '@components/all/ToastUI';
import {
  useGameReservationStore,
  useTimeReservationStore,
} from '@store/makeReservationInfo';
import { usePriceStore } from '@store/priceStore';
import { convertToNextDayIfNextDay } from '@utils/formatDate';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function MakeResButtonCard({
  clubName,
  address,
  clubStartTime,
}: {
  clubName: string;
  address: string;
  clubStartTime: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const clubId = pathname.split('/').at(-1);
  const [toastId, setToastId] = useState<string | null>(null);
  const price = usePriceStore((state) => state.price);
  const timeResInfo = useTimeReservationStore(
    (state) => state.timeReservationInfo
  );
  const gameResInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const setIsFromReservationPage = usePriceStore(
    (state) => state.setIsFromReservation
  );
  const handleWrongSubmit = (type: 'GAME' | 'TIME') => {
    if (toastId !== null) {
      toast.remove(toastId);
    }
    const id = toast.custom(
      <ToastUI
        message="시작 시간, 원하는 게임을 선택해주세요"
        iswarning={true}
      />,
      {
        duration: toastUIDuration,
      }
    );

    setToastId(id);
    return;
  };

  const curPrice = usePriceStore((state) => state.price);

  const handleReservation = () => {
    // 그냥 GAME으로 통일
    if (!clubId || !gameResInfo.startTime || curPrice === 0) {
      handleWrongSubmit('GAME');
      return; // clubId가 undefined, null, ''과 같은 경우
    }
    const calculateDate = convertToNextDayIfNextDay(
      gameResInfo.startTime?.slice(11, 16) || '',
      clubStartTime,
      gameResInfo.date
    );

    const query = {
      gameType: 'GAME',
      date: calculateDate,
      startTime: gameResInfo.startTime,
      gameCount: String(gameResInfo.gameCount),
      request: gameResInfo.request,
      // price: '금액 by BE',
      adultCount: String(gameResInfo.adultCount),
      teenagerCount: String(gameResInfo.teenagerCount),
      kidsCount: String(gameResInfo.kidsCount),
      clubName: clubName,
      address: address,
      gameDescription: gameResInfo.gameDescription,
    };
    const queryString = new URLSearchParams(query).toString();
    setIsFromReservationPage(true);
    router.push(`/payment/before/${clubId}?${queryString}`);
  };
  return (
    <section className="h-[78px] w-full flex  gap-[10px] justify-center items-center px-5 py-[14px] absolute bottom-0 bg-white shadow-absoluteButton">
      <div className="w-[100px] h-full flex flex-col justify-between p-1">
        <p className="title4 text-grey8">총 결제금액</p>
        <p className="title3 text-primary_orange1">
          {price.toLocaleString()}원
        </p>
      </div>
      <FullButton
        bgColor="primary_orange1"
        color="white"
        content="예약하기"
        size="lg"
        onClick={handleReservation}
      />
    </section>
  );
}
