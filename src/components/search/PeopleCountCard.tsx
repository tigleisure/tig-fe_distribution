'use client';
import { ChooseCardProps } from 'types/search/SearchTypes';
import ChooseCard from '../reservation/ChooseCard';
import InfoCard from '../all/InfoCard';
import { useSearchInputInfo } from '@store/searchInfoStore';
import { useEffect } from 'react';

const chooseLists: ChooseCardProps[] = [
  { title: '성인', description: '만 19세 이상' },
  { title: '청소년', description: '만 14세 ~ 만 18세' },
  { title: '어린이', description: '만 13세 이하' },
];

export default function PeopleCountCard() {
  const inputSearchValue = useSearchInputInfo((state) => state.searchInput);
  const setSearchCount = useSearchInputInfo((state) => state.setSearchInput);

  useEffect(() => {
    setSearchCount({
      ...inputSearchValue,
      adultCount: 0,
      teenagerCount: 0,
      kidsCount: 0,
    });
  }, []);
  return (
    <section className="w-full h-[337px] flex flex-col p-5 mt-5">
      <InfoCard number={4} content="인원을 선택해주세요." />
      {chooseLists.map((chooseList) => (
        <ChooseCard
          key={chooseList.description}
          title={chooseList.title}
          description={chooseList.description}
        />
      ))}
    </section>
  );
}
