import CountDownSVG from '@public/svg/countDown.svg';
import CountUpSVG from '@public/svg/countUp.svg';
import { useGameReservationStore } from '@store/makeReservationInfo';
import { usePriceStore } from '@store/priceStore';
import { cn } from '@utils/cn';
import { useEffect, useState } from 'react';

export default function GameCountDistinWeekCard({
  name,
  price,
  isWeek,
}: {
  name: string;
  price: number;
  isWeek: boolean;
}) {
  const totalPrice = usePriceStore((state) => state.price);
  const pushPrice = usePriceStore((state) => state.pushPrice);
  const popPrice = usePriceStore((state) => state.popPrice);
  const getPriceStackLength = usePriceStore(
    (state) => state.getPriceStackLength
  );
  const [count, setCount] = useState(getPriceStackLength());
  const setPrice = usePriceStore((state) => state.setPrice);
  const gameResInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const setGameResInfo = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );
  const countDownHandler = () => {
    if (count === 0) return;
    setCount(getPriceStackLength() - 1);
    const updatePrice = totalPrice - price;
    // setPrice(updatePrice);
    popPrice();
    if (count === 1) {
      setGameResInfo({ ...gameResInfo, gameDescription: '' });
    }
  };

  const countUpHandler = () => {
    setCount(getPriceStackLength() + 1);
    const updatePrice = totalPrice + price;
    // setPrice(updatePrice);
    pushPrice(price);
    setGameResInfo({ ...gameResInfo, gameDescription: name });
  };

  useEffect(() => {
    setCount(getPriceStackLength());
  }, [totalPrice]);

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
        <div className="flex gap-1 h-[22px]">
          <p
            className={cn(
              'w-[30px] rounded-[6px] body4 flex justify-center items-center ',
              {
                'bg-[#30FF6B]/20': !isWeek,
                'bg-[#F45858]/20': isWeek,
              }
            )}
          >
            {isWeek ? '주말' : '평일'}
          </p>
          <p className="title2 text-grey7 mt-[2px]">{name}</p>
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
