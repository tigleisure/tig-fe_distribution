import InfoCard from '@components/all/InfoCard';
import Calender from '@components/search/Calender';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ResDateCard() {
  const searchParam = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const dateParam = searchParam.get('date');
    if (dateParam && dateParam < new Date().toISOString().split('T')[0]) {
      router.back();
    }
  }, []);
  return (
    <section className="w-full flex flex-col gap-5 p-5 mt-5 border-b border-grey2 pt-[68px]">
      <InfoCard number={1} content="날짜를 선택해주세요." />
      <Calender />
    </section>
  );
}
