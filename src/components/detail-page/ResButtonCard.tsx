'use client';
import FullButton from '@components/all/FullButton';
import { formatDate } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function ResButtonCard({
  companyId,
  type,
  date,
}: {
  companyId: string;
  type: string;
  date: string;
}) {
  const router = useRouter();
  const handleReservation = () => {
    if (!localStorage.getItem('accessToken')) {
      router.push('/login');
      return;
    }
    const resDate = new Date(date);
    const formatDayOfWeek = formatDate(resDate, 'EEE').toUpperCase();
    if (type === 'GAME') {
      router.push(
        `/reservation/game/${companyId}?date=${date}&dayOfWeek=${formatDayOfWeek}`
      );
    } else {
      // type === 'TIME'
      router.push(
        `/reservation/time/${companyId}?date=${date}&dayOfWeek=${formatDayOfWeek}`
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
