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
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function MakeResButtonCard({
  clubName,
  address,
  clubStartTime,
  from = 'sports',
}: {
  clubName: string;
  address: string;
  clubStartTime: string;
  from?: 'sports' | 'package';
}) {
  const router = useRouter();
  const pathname = usePathname();
  const gameType = pathname.split('/').at(-2);
  const clubId = pathname.split('/').at(-1);
  const [toastId, setToastId] = useState<string | null>(null);
  const price = usePriceStore((state) => state.price);
  const clearPrice = usePriceStore((state) => state.clearPriceStack);
  const getPriceStackLength = usePriceStore(
    (state) => state.getPriceStackLength
  );
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
        message="시작 시간, 참여 인원, 원하는 게임을 선택해주세요"
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
    // 업체가 들어옴에 따라 게임별로 분류
    if (gameType === 'PENSION') {
      if (
        !clubId ||
        !gameResInfo.date ||
        !gameResInfo.endDate ||
        // curPrice === 0 펜션은 가격이 0원이어도 예약 가능(임시)
        gameResInfo.adultCount === 0
      ) {
        handleWrongSubmit('GAME');
        return;
      }
    } else if (gameType === 'BUS') {
      if (
        !clubId ||
        !gameResInfo.date ||
        !gameResInfo.departureDate ||
        !gameResInfo.departurePlace ||
        !gameResInfo.returnPlace
        // curPrice === 0 버스는 가격이 0원이어도 예약 가능(임시)
      ) {
        console.log(gameResInfo);
        handleWrongSubmit('GAME');
        return;
      }
    } else if (gameType === 'CATERING') {
      if (
        !clubId ||
        !gameResInfo.date ||
        !gameResInfo.receiptDate ||
        !gameResInfo.deliveryAddress
        // curPrice === 0 버스는 가격이 0원이어도 예약 가능(임시)
      ) {
        console.log(gameResInfo);
        handleWrongSubmit('GAME');
        return;
      }
    } else if (gameType === 'LUNCH_BOX') {
      if (
        !clubId ||
        !gameResInfo.date ||
        !gameResInfo.receiptDate ||
        !gameResInfo.deliveryAddress
        // curPrice === 0 버스는 가격이 0원이어도 예약 가능(임시)
      ) {
        console.log(gameResInfo);
        handleWrongSubmit('GAME');
        return;
      }
    } else if (gameType === 'GROUP_UNIFORM') {
      if (
        !clubId ||
        !gameResInfo.deliveryAddress
        // curPrice === 0 버스는 가격이 0원이어도 예약 가능(임시)
      ) {
        console.log(gameResInfo);
        handleWrongSubmit('GAME');
        return;
      }
    } else if (
      !clubId ||
      !gameResInfo.startTime ||
      curPrice === 0 ||
      gameResInfo.adultCount === 0
    ) {
      handleWrongSubmit('GAME');
      return; // clubId가 undefined, null, ''과 같은 경우
    }

    const calculateDate = convertToNextDayIfNextDay(
      gameResInfo.startTime?.slice(11, 16) || '',
      clubStartTime,
      gameResInfo.startTime || ''
    );

    const query = {
      gameType: gameType || '',
      date: gameResInfo.date,
      // 펜션용
      endDate: gameResInfo.endDate || '',
      startTime: calculateDate,
      gameCount: String(gameResInfo.gameCount),
      request: gameResInfo.request,
      // price: '금액 by BE',
      adultCount: String(gameResInfo.adultCount),
      teenagerCount: String(gameResInfo.teenagerCount),
      kidsCount: String(gameResInfo.kidsCount),
      clubName: clubName,
      address: address,
      gameDescription:
        from === 'sports'
          ? gameResInfo.gameDescription + ', ' + getPriceStackLength() + '회'
          : gameResInfo.gameDescription,
      message: gameResInfo.request,
      travelType: gameResInfo.travelType,
      departureDate: gameResInfo.departureDate || '',
      returnDate: gameResInfo.returnDate || '',
      departurePlace: gameResInfo.departurePlace || '',
      returnPlace: gameResInfo.returnPlace || '',
      receiptDate: gameResInfo.receiptDate || '',
      deliveryAddress: gameResInfo.deliveryAddress || '',
    };
    const queryString = new URLSearchParams(query).toString();
    setIsFromReservationPage(true);
    router.push(`/payment/before/${clubId}?${queryString}`);
  };

  useEffect(() => {
    clearPrice();
  }, []);

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
