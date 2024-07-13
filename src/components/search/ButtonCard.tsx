'use client';
import FullButton from '@components/all/FullButton';
import { useSearchInputInfo } from '@store/searchInfoStore';
import { useRouter } from 'next/navigation';

export default function ButtonCard() {
  const inputValue = useSearchInputInfo((state) => state.searchInput);
  const router = useRouter();
  const handleSearch = () => {
    // search POST 요청에 필요한 속성
    console.log(inputValue);
    const query = {
      search: inputValue.searchValue,
      date: inputValue.searchDate,
      adultCount: String(inputValue.adultCount),
      teenagerCount: String(inputValue.teenagerCount),
      kidCount: String(inputValue.kidCount),
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
