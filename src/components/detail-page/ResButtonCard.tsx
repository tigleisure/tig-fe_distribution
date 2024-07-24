'use client';
import FullButton from '@components/all/FullButton';
import { useRouter } from 'next/navigation';

export default function ResButtonCard({
  companyId,
  type,
}: {
  companyId: string;
  type: string;
}) {
  const router = useRouter();
  const handleReservation = () => {
    if (!localStorage.getItem('accessToken')) {
      router.push('/login');
      return;
    }

    if (type === 'GAME') {
      router.push(`/reservation/game/${companyId}`);
    } else {
      // type === 'TIME'
      router.push(`/reservation/time/${companyId}`);
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
