'use client';
import FullButton from '@components/all/FullButton';
import { useRouter } from 'next/navigation';

export default function ResButtonCard() {
  const router = useRouter();
  return (
    <section className="h-[78px] w-full flex justify-center items-center px-5 py-[14px] absolute bottom-0 bg-white shadow-absoluteButton">
      <FullButton
        bgColor="primary_orange1"
        color="white"
        content="예약하기"
        size="lg"
        onClick={() => {
          router.push('/reservation/game');
        }}
      />
    </section>
  );
}
