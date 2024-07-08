'use client';
import FullButton from '@components/all/FullButton';
import { useRouter } from 'next/navigation';

export default function ResButtonCard() {
  const router = useRouter();
  const handleReservation = () => {
    const query = {
      date: '05.17 (화)',
      startTime: '오전 10:00',
      endTime: '오후 11:00',
      adultCount: '5',
    };
    const queryString = new URLSearchParams(query).toString();
    router.push(`/reservation/time/1?${queryString}`);
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
