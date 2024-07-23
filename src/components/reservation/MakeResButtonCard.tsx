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
  const clubId = pathname.split('/').at(-1);
  const timeResInfo = useTimeReservationStore(
    (state) => state.timeReservationInfo
  );
  const gameResInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const handleReservation = () => {
    if (pathname.startsWith('/reservation/game')) {
      console.log('gameResInfo', gameResInfo);
      if (
        !clubId ||
        !gameResInfo.startTime ||
        !gameResInfo.gameCount ||
        (gameResInfo.adultCount === 0 &&
          gameResInfo.teenagerCount === 0 &&
          gameResInfo.kidsCount === 0)
      )
        return; // clubId가 undefined, null, ''과 같은 경우
      const query = {
        gameType: 'GAME',
        date: gameResInfo.date,
        startTime: gameResInfo.startTime,
        gameCount: String(gameResInfo.gameCount),
        request: gameResInfo.request,
        // price: '금액 by BE',
        adultCount: String(gameResInfo.adultCount),
        teenagerCount: String(gameResInfo.teenagerCount),
        kidsCount: String(gameResInfo.kidsCount),
        clubName: '회사 이름 by BE',
        address: '회사 주소 by BE',
      };
      const queryString = new URLSearchParams(query).toString();
      router.push(`/payment/before/${clubId}?${queryString}`);
    } else {
      console.log('timeResInfo', timeResInfo);
      if (
        !clubId ||
        !timeResInfo.startTime ||
        !timeResInfo.endTime ||
        (timeResInfo.adultCount === 0 &&
          timeResInfo.teenagerCount === 0 &&
          timeResInfo.kidsCount === 0)
      )
        return; // clubId가 undefined, null, ''과 같은 경우
      const query = {
        gameType: 'TIME',
        date: timeResInfo.date,
        startTime: timeResInfo.startTime,
        endTime: timeResInfo.endTime,
        request: timeResInfo.request,
        // price: '금액 by BE',
        adultCount: String(timeResInfo.adultCount),
        teenagerCount: String(timeResInfo.teenagerCount),
        kidsCount: String(timeResInfo.kidsCount),
        clubName: '회사 이름 by BE',
        address: '회사 주소 by BE',
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
