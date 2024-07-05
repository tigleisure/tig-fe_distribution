'use client';
import FullButton from '@components/all/FullButton';
import { useRouter } from 'next/navigation';
import querystring from 'querystring';

export default function ButtonCard() {
  const router = useRouter();
  const handleSearch = () => {
    const query = {
      location: '신촌',
      date: '24.05.17',
      adultCount: '5',
    };
    const queryString = new URLSearchParams(query).toString();
    router.push(`/search/result?${queryString}`);
  };
  return (
    <section className="h-[78px] w-full flex justify-center items-center px-5 py-[14px] absolute bottom-0 bg-white shadow-absoluteButton">
      <FullButton
        bgColor="primary_orange1"
        color="white"
        content="검색"
        size="lg"
        onClick={handleSearch}
      />
    </section>
  );
}
