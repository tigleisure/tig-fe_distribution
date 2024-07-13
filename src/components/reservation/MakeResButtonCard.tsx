'use client';
import FullButton from '@components/all/FullButton';
import {
  useGameReservationStore,
  useTimeReservationStore,
} from '@store/makeReservationInfo';
import { usePathname, useRouter } from 'next/navigation';

export default function MakeResButtonCard() {
  const router = useRouter();
  const pathname = usePathname();
  const timeResInfo = useTimeReservationStore(
    (state) => state.timeReservationInfo
  );
  const gameResInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const handleReservation = () => {
    if (pathname.startsWith('/reservation/game')) {
      console.log('gameResInfo', gameResInfo);
      const query ={
        gametype: 'game',
        date: gameResInfo.date,
        startTime: gameResInfo.startTime,
        gameCount: String(gameResInfo.gameCount),
        price: '금액 by BE',
        adultCount: String(gameResInfo.adultCount),
        teenagerCount: String(gameResInfo.teenagerCount),
        kidCount: String(gameResInfo.kidCount),
        companyName: '회사 이름 by BE',
        companyAddress: '회사 주소 by BE',
      };
      const queryString = new URLSearchParams(query).toString();
      router.push(`/payment/before/1?${queryString}`);
    } else {
      console.log('timeResInfo', timeResInfo);
      const query ={
        gametype: 'time',
        date: gameResInfo.date,
        startTime: gameResInfo.startTime,
        gameCount: String(gameResInfo.gameCount),
        price: '금액 by BE',
        adultCount: String(gameResInfo.adultCount),
        teenagerCount: String(gameResInfo.teenagerCount),
        kidCount: String(gameResInfo.kidCount),
        companyName: '회사 이름 by BE',
        companyAddress: '회사 주소 by BE',
      };
      const queryString = new URLSearchParams(query).toString();
      router.push(`/payment/before/1?${queryString}`);
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
