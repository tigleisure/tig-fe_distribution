'use client';
import FullButton from '@components/all/FullButton';
import { useRouter } from 'next/navigation';

export default function MakeResButtonCard() {
  const router = useRouter();
  const handleReservation = () => {
    const query = {
      gametype: 'time',
      date: '05.17 (화)',
      startTime: '오전 10:00',
      endTime: '오후 11:00',
      price: '10,000',
      adultCount: '5',
      companyName: '스카이락 볼링장',
      companyAddress: '서울 서대문구 신촌로 73 케이스퀘어 8층',
    };
    const queryString = new URLSearchParams(query).toString();
    router.push(`/payment/before/1?${queryString}`);
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
