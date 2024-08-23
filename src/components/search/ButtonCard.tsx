'use client';
import FullButton from '@components/all/FullButton';
import { useSearchInputInfo } from '@store/searchInfoStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useGetUserNearestDistrict } from '@apis/search/getNearestDistrict';
import { da } from 'date-fns/locale';

export default function ButtonCard() {
  const inputValue = useSearchInputInfo((state) => state.searchInput);
  const router = useRouter();
  const [nearestDistrict, setNearestDistrict] = useState<string>('신촌');
  const nearestDistrictMutation = useGetUserNearestDistrict();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      nearestDistrictMutation.mutate(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        {
          onSuccess(data) {
            setNearestDistrict(data.result.nearestDistrict);
          },
          onError() {
            // 데이터 통신이 실패 시에는 일단 신촌 키워드로 유지
            setNearestDistrict('신촌');
          },
        }
      );
    });
  }, []);
  const handleSearch = () => {
    // search POST 요청에 필요한 속성

    const query = {
      search:
        inputValue.searchValue === ''
          ? nearestDistrict
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
      isKeyword: inputValue.searchValue === '' ? 'false' : 'true',
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
