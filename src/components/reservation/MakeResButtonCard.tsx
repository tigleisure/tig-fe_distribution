'use client';
import FullButton from '@components/all/FullButton';
import ToastUI, { toastUIDuration } from '@components/mypage/ToastUI';
import {
  useGameReservationStore,
  useTimeReservationStore,
} from '@store/makeReservationInfo';
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
  const timeResInfo = useTimeReservationStore(
    (state) => state.timeReservationInfo
  );
  const gameResInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const handleWrongSubmit = (type: 'GAME' | 'TIME') => {
    if (toastId !== null) {
      toast.remove(toastId);
    }
    const id = toast.custom(
      <ToastUI
        message={
          type === 'GAME'
            ? '게임 수, 시작 시간, 인원을 선택해주세요'
            : '시작 및 종료 시간, 인원을 선택해주세요'
        }
        iswarning={true}
      />,
      {
        duration: toastUIDuration,
      }
    );

    setToastId(id);
    return;
  };

  const handleReservation = () => {
    if (pathname.startsWith('/reservation/game')) {
      if (
        !clubId ||
        !gameResInfo.startTime ||
        !gameResInfo.gameCount ||
        (gameResInfo.adultCount === 0 &&
          gameResInfo.teenagerCount === 0 &&
          gameResInfo.kidsCount === 0)
      ) {
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
      };
      const queryString = new URLSearchParams(query).toString();
      router.push(`/payment/before/${clubId}?${queryString}`);
    } else {
      if (
        !clubId ||
        !timeResInfo.startTime ||
        !timeResInfo.endTime ||
        (timeResInfo.adultCount === 0 &&
          timeResInfo.teenagerCount === 0 &&
          timeResInfo.kidsCount === 0)
      ) {
        handleWrongSubmit('TIME');
        return; // clubId가 undefined, null, ''과 같은 경우
      }
      const calculateDate = convertToNextDayIfNextDay(
        timeResInfo.startTime?.slice(11, 16) || '',
        clubStartTime,
        timeResInfo.date
      );

      const query = {
        gameType: 'TIME',
        date: calculateDate,
        startTime: timeResInfo.startTime,
        endTime: timeResInfo.endTime,
        request: timeResInfo.request,
        // price: '금액 by BE',
        adultCount: String(timeResInfo.adultCount),
        teenagerCount: String(timeResInfo.teenagerCount),
        kidsCount: String(timeResInfo.kidsCount),
        clubName: clubName,
        address: address,
      };
      const queryString = new URLSearchParams(query).toString();
      router.push(`/payment/before/${clubId}?${queryString}`);
    }
  };
  return (
    <section className="h-[78px] w-full flex justify-center items-center px-5 py-[14px] absolute bottom-0 bg-white shadow-absoluteButton">
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
