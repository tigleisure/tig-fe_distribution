'use client';

import { use, useState } from 'react';
import CountDownSVG from '@public/svg/countDown.svg';
import CountUpSVG from '@public/svg/countUp.svg';
import { ChooseCardProps } from 'types/search/SearchTypes';
import { cn } from '@utils/cn';
import { useSearchInputInfo } from '@store/searchInfoStore';
import { set } from 'date-fns';

export default function ChooseCard({ title, description }: ChooseCardProps) {
  const [count, setCount] = useState(0);
  const inputValue = useSearchInputInfo((state) => state.searchInput);
  const setAdultCount = useSearchInputInfo((state) => state.setSearchInput);
  const setTeenagerCount = useSearchInputInfo((state) => state.setSearchInput);
  const setKidCount = useSearchInputInfo((state) => state.setSearchInput);

  const countDownHandler = () => {
    setCount((prev) => prev - 1);
    if (title === '성인') {
      setAdultCount({ ...inputValue, adultCount: inputValue.adultCount - 1 });
    } else if (title === '청소년') {
      setTeenagerCount({
        ...inputValue,
        teenagerCount: inputValue.teenagerCount - 1,
      });
    } else if (title === '어린이') {
      setKidCount({ ...inputValue, kidCount: inputValue.kidCount - 1 });
    }
  };
  const countUpHandler = () => {
    setCount((prev) => prev + 1);
    if (title === '성인') {
      setAdultCount({ ...inputValue, adultCount: inputValue.adultCount + 1 });
    } else if (title === '청소년') {
      setTeenagerCount({
        ...inputValue,
        teenagerCount: inputValue.teenagerCount + 1,
      });
    } else if (title === '어린이') {
      setKidCount({ ...inputValue, kidCount: inputValue.kidCount + 1 });
    }
  };

  return (
    <article
      className={cn('h-[70px] w-full px-5 py-4 flex justify-between', {
        'mt-1': title === '성인',
        'border-b border-grey2': title !== '어린이',
      })}
    >
      <div className="flex flex-col justify-between h-full">
        <p className="title3 text-grey7">{title}</p>
        <p className="body4 text-grey5">{description}</p>
      </div>
      <div className="flex justify-between items-center w-[100px]">
        <CountDownSVG
          fill={count === 0 ? '#CED3D6' : '#878D91'}
          className="cursor-pointer select-none"
          onClick={countDownHandler}
        />
        <p className="body2 text-grey6 select-none">{count}</p>
        <CountUpSVG
          fill="#878D91"
          className="cursor-pointer select-none"
          onClick={countUpHandler}
        />
      </div>
    </article>
  );
}
