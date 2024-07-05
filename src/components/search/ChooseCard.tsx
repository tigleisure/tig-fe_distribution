'use client';

import { useState } from 'react';
import CountDownSVG from '@public/svg/countDown.svg';
import CountUpSVG from '@public/svg/countUp.svg';
import { ChooseCardProps } from 'types/search/SearchTypes';
import { cn } from '@utils/cn';

export default function ChooseCard({ title, description }: ChooseCardProps) {
  const [count, setCount] = useState(0);
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
          onClick={() => {
            if (count > 0) setCount((prev) => prev - 1);
          }}
        />
        <p className="body2 text-grey6 select-none">{count}</p>
        <CountUpSVG
          fill="#878D91"
          className="cursor-pointer select-none"
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        />
      </div>
    </article>
  );
}
