'use client';
import FullButton from '@components/all/FullButton';
import { useSearchInputInfo } from '@store/searchInfoStore';
import { useRouter } from 'next/navigation';

export default function ButtonCard() {
  const inputValue = useSearchInputInfo((state) => state.searchInput);
  const router = useRouter();
  const handleSearch = () => {
    // search POST 요청에 필요한 속성

    const query = {
      search:
        inputValue.searchValue === ''
          ? '신촌'
          : encodeURIComponent(inputValue.searchValue),
      date: inputValue.searchDate,
      adultCount: String(
        inputValue.adultCount === 0 &&
          inputValue.teenagerCount === 0 &&
          inputValue.kidsCount === 0
          ? 1
          : inputValue.adultCount
      ),
      teenagerCount: String(inputValue.teenagerCount),
      kidsCount: String(inputValue.kidsCount),
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
