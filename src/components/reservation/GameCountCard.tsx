import CountDownSVG from '@public/svg/countDown.svg';
import CountUpSVG from '@public/svg/countUp.svg';
import { useGameReservationStore } from '@store/makeReservationInfo';
import { usePriceStore } from '@store/priceStore';
import { cn } from '@utils/cn';
import { ComponentType, useEffect, useState } from 'react';

export default function GameCountCard({
  name,
  price,
  from = 'sports',
}: {
  name: string;
  price: number;
  from?: 'sports' | 'package';
}) {
  const totalPrice = usePriceStore((state) => state.price);
  const pushPrice = usePriceStore((state) => state.pushPrice);
  const popPrice = usePriceStore((state) => state.popPrice);
  const getTopItemName = usePriceStore((state) => state.getTopItemName);
  const [count, setCount] = useState(0);
  const gameResInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  console.log(gameResInfo);
  const setGameResInfo = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );
  const countDownHandler = () => {
    if (count === 0) return;
    setCount((prev) => prev - 1);
    popPrice();
    if (count === 1) {
      setGameResInfo({ ...gameResInfo, gameDescription: '' });
    }
  };

  const countUpHandler = () => {
    setCount((prev) => prev + 1);
    if (from === 'sports') pushPrice({ name, price });
    else pushPrice({ name, price: price * gameResInfo.adultCount });
    setGameResInfo({ ...gameResInfo, gameDescription: name });
  };

  useEffect(() => {
    if (totalPrice === 0) {
      setCount(0);
    }
  }, [totalPrice]);

  useEffect(() => {
    if (name !== getTopItemName()) {
      setCount(0);
    }
  }, [getTopItemName()]);

  return from === 'sports' ? (
    <SportsCard
      name={name}
      price={price}
      count={count}
      countDownHandler={countDownHandler}
      countUpHandler={countUpHandler}
    />
  ) : (
    <PackageCard
      name={name}
      price={price}
      count={count}
      countUpHandler={countUpHandler}
    />
  );
}

type SportsCardProps = {
  name: string;
  price: number;
  count: number;
  countDownHandler: () => void;
  countUpHandler: () => void;
};

function SportsCard({
  name,
  price,
  count,
  countDownHandler,
  countUpHandler,
}: SportsCardProps) {
  return (
    <section
      className={cn(
        'w-full flex py-4 px-3 rounded-[12px] h-[95px] justify-between items-center border border-grey3',
        {
          'border-grey3': count === 0,
          'border-primary_orange1 bg-[#FFF0D3]/20': count > 0,
        }
      )}
    >
      <div className="flex flex-col h-full justify-between">
        <p className="title2 text-grey7">{name}</p>
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
      </div>
      <div className="flex flex-col h-full justify-end">
        <p className="headline2 text-primary_orange1">
          {price.toLocaleString()}
          <span className="title3 text-primary_orange1">원</span>
        </p>
      </div>
    </section>
  );
}

type PackageCardProps = {
  name: string;
  price: number;
  count: number;
  countUpHandler: () => void;
};

function PackageCard({ name, price, count, countUpHandler }: PackageCardProps) {
  return (
    <section
      className={cn(
        'w-full flex p-4 rounded-[12px] h-[64px] justify-between items-center border border-grey3',
        {
          'border-grey3': count === 0,
          'border-primary_orange1 bg-[#FFF0D3]/20': count > 0,
        }
      )}
      onClick={countUpHandler}
    >
      <div className="flex flex-col h-full justify-center">
        <p className="title2 text-grey7">{name}</p>
      </div>
      <div className="flex flex-col h-full justify-center">
        <p className="headline2 text-primary_orange1">
          {price.toLocaleString()}
          <span className="title3 text-primary_orange1">원</span>
        </p>
      </div>
    </section>
  );
}
