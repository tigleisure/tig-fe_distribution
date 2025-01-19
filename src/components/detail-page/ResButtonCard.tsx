'use client';
import FullButton from '@components/all/FullButton';
import { formatDate } from 'date-fns';
import { el } from 'date-fns/locale';
import { Catamaran } from 'next/font/google';
import { useRouter } from 'next/navigation';

export default function ResButtonCard({
  companyId,
  type,
  date,
  category,
}: {
  companyId: string;
  type: string;
  date: string;
  category: string;
}) {
  const router = useRouter();
  const handleReservation = () => {
    const resDate = new Date(date);
    const formatDayOfWeek = formatDate(resDate, 'EEE').toUpperCase();
    // if (type === 'GAME') {
    //   router.push(
    //     `/reservation/game/${companyId}?date=${date}&dayOfWeek=${formatDayOfWeek}`
    //   );
    // } else {
    //   // type === 'TIME'
    //   router.push(
    //     `/reservation/time/${companyId}?date=${date}&dayOfWeek=${formatDayOfWeek}`
    //   );
    // }
    if (category === 'FOOTBALL') {
      router.push(
        `/reservation/FOOTBALL/${companyId}?date=${date}&dayOfWeek=${formatDayOfWeek}`
      );
    } else if (category === 'BILLIARDS') {
      router.push(
        `/reservation/BILLIARDS/${companyId}?date=${date}&dayOfWeek=${formatDayOfWeek}`
      );
    } else if (category === 'TABLE_TENNIS') {
      router.push(
        `/reservation/TABLE_TENNIS/${companyId}?date=${date}&dayOfWeek=${formatDayOfWeek}`
      );
    } else if (category === 'BASEBALL') {
      router.push(
        `/reservation/BASEBALL/${companyId}?date=${date}&dayOfWeek=${formatDayOfWeek}`
      );
    } else if (category === 'SQUASH') {
      router.push(
        `/reservation/SQUASH/${companyId}?date=${date}&dayOfWeek=${formatDayOfWeek}`
      );
    } else if (category === 'TENNIS') {
      router.push(
        `/reservation/TENNIS/${companyId}?date=${date}&dayOfWeek=${formatDayOfWeek}`
      );
    } else if (category === 'GOLF') {
      router.push(
        `/reservation/GOLF/${companyId}?date=${date}&dayOfWeek=${formatDayOfWeek}`
      );
    } else if (category === 'BALLING') {
      router.push(
        `/reservation/BALLING/${companyId}?date=${date}&dayOfWeek=${formatDayOfWeek}`
      );
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
