'use client';

import { use, useState } from 'react';
import CountDownSVG from '@public/svg/countDown.svg';
import CountUpSVG from '@public/svg/countUp.svg';
import { ChooseCardProps } from 'types/search/SearchTypes';
import { cn } from '@utils/cn';
import { useSearchInputInfo } from '@store/searchInfoStore';
import { usePathname } from 'next/navigation';
import {
  useGameReservationStore,
  useTimeReservationStore,
} from '@store/makeReservationInfo';

export default function ChooseCard({ title, description }: ChooseCardProps) {
  const [count, setCount] = useState(0);
  const pathname = usePathname();

  const inputSearchValue = useSearchInputInfo((state) => state.searchInput);
  const setAdultSearchCount = useSearchInputInfo(
    (state) => state.setSearchInput
  );
  const setTeenagerSearchCount = useSearchInputInfo(
    (state) => state.setSearchInput
  );
  const setKidSearchCount = useSearchInputInfo((state) => state.setSearchInput);

  const inputGameResValue = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const setAdultGameResCount = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );
  const setTeenagerGameResCount = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );
  const setKidGameResCount = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );

  const inputTimeResValue = useTimeReservationStore(
    (state) => state.timeReservationInfo
  );
  const setAdultTimeResCount = useTimeReservationStore(
    (state) => state.setTimeReservationInfo
  );
  const setTeenagerTimeResCount = useTimeReservationStore(
    (state) => state.setTimeReservationInfo
  );
  const setKidTimeResCount = useTimeReservationStore(
    (state) => state.setTimeReservationInfo
  );

  const countDownHandler = () => {
    setCount((prev) => prev - 1);
    if (pathname.startsWith('/reservation/game')) {
      if (title === '성인') {
        setAdultGameResCount({
          ...inputGameResValue,
          adultCount: inputGameResValue.adultCount - 1,
        });
      } else if (title === '청소년') {
        setTeenagerGameResCount({
          ...inputGameResValue,
          teenagerCount: inputGameResValue.teenagerCount - 1,
        });
      } else if (title === '어린이') {
        setKidGameResCount({
          ...inputGameResValue,
          kidsCount: inputGameResValue.kidsCount - 1,
        });
      }
    } else if (pathname.startsWith('/reservation/time')) {
      if (title === '성인') {
        setAdultTimeResCount({
          ...inputTimeResValue,
          adultCount: inputTimeResValue.adultCount - 1,
        });
      } else if (title === '청소년') {
        setTeenagerTimeResCount({
          ...inputTimeResValue,
          teenagerCount: inputTimeResValue.teenagerCount - 1,
        });
      } else if (title === '어린이') {
        setKidTimeResCount({
          ...inputTimeResValue,
          kidsCount: inputTimeResValue.kidsCount - 1,
        });
      } else if (title === '게임') {
        setKidGameResCount({
          ...inputGameResValue,
          gameCount: inputGameResValue.gameCount - 1,
        });
      }
    } else {
      // search
      if (title === '성인') {
        setAdultSearchCount({
          ...inputSearchValue,
          adultCount: inputSearchValue.adultCount - 1,
        });
      } else if (title === '청소년') {
        setTeenagerSearchCount({
          ...inputSearchValue,
          teenagerCount: inputSearchValue.teenagerCount - 1,
        });
      } else if (title === '어린이') {
        setKidSearchCount({
          ...inputSearchValue,
          kidsCount: inputSearchValue.kidsCount - 1,
        });
      }
    }
  };

  const countUpHandler = () => {
    setCount((prev) => prev + 1);
    if (pathname.startsWith('/reservation/game')) {
      if (title === '성인') {
        setAdultGameResCount({
          ...inputGameResValue,
          adultCount: inputGameResValue.adultCount + 1,
        });
      } else if (title === '청소년') {
        setTeenagerGameResCount({
          ...inputGameResValue,
          teenagerCount: inputGameResValue.teenagerCount + 1,
        });
      } else if (title === '어린이') {
        setKidGameResCount({
          ...inputGameResValue,
          kidsCount: inputGameResValue.kidsCount + 1,
        });
      } else if (title === '어린이') {
        setKidGameResCount({
          ...inputGameResValue,
          kidsCount: inputGameResValue.kidsCount + 1,
        });
      } else if (title === '게임') {
        setKidGameResCount({
          ...inputGameResValue,
          gameCount: inputGameResValue.gameCount + 1,
        });
      }
    } else if (pathname.startsWith('/reservation/time')) {
      if (title === '성인') {
        setAdultTimeResCount({
          ...inputTimeResValue,
          adultCount: inputTimeResValue.adultCount + 1,
        });
      } else if (title === '청소년') {
        setTeenagerTimeResCount({
          ...inputTimeResValue,
          teenagerCount: inputTimeResValue.teenagerCount + 1,
        });
      } else if (title === '어린이') {
        setKidTimeResCount({
          ...inputTimeResValue,
          kidsCount: inputTimeResValue.kidsCount + 1,
        });
      }
    } else {
      // search
      if (title === '성인') {
        setAdultSearchCount({
          ...inputSearchValue,
          adultCount: inputSearchValue.adultCount + 1,
        });
      } else if (title === '청소년') {
        setTeenagerSearchCount({
          ...inputSearchValue,
          teenagerCount: inputSearchValue.teenagerCount + 1,
        });
      } else if (title === '어린이') {
        setKidSearchCount({
          ...inputSearchValue,
          kidsCount: inputSearchValue.kidsCount + 1,
        });
      }
    }
  };

  return (
    <article
      className={cn('h-[70px] w-full px-5 py-4 flex justify-between', {
        'mt-1': title === '성인' || title === '게임',
        'border-b border-grey2': title !== '어린이' && title !== '게임',
      })}
    >
      <div
        className={cn('flex flex-col justify-between h-full', {
          'justify-center': title === '게임',
        })}
      >
        <p className="title3 text-grey7">{title}</p>
        {description && <p className="body4 text-grey5">{description}</p>}
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
