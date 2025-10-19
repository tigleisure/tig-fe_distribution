'use client';
import {
  useGameReservationStore,
  useTimeReservationStore,
} from '@store/makeReservationInfo';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function RequestCard({ number = 4 }: { number?: number }) {
  const [inputValue, setInputValue] = useState('');
  const [inputLength, setInputLength] = useState(0);
  const pathname = usePathname();

  const inputGameResValue = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const setInputGameResValue = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );

  const inputTimeResValue = useTimeReservationStore(
    (state) => state.timeReservationInfo
  );
  const InputGameResValue = useTimeReservationStore(
    (state) => state.setTimeReservationInfo
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 100) return;
    setInputValue(e.target.value);
    setInputLength(e.target.value.length);
    setInputGameResValue({ ...inputGameResValue, request: e.target.value });
  };

  return (
    <section className="w-full px-5 pt-[40px] pb-[98px] flex flex-col gap-[24px] ">
      <article className="w-full flex justify-between">
        <div className="w-fit gap-2 flex">
          <p className="w-[18px] h-[18px] rounded-full bg-primary_orange1 text-white title4 flex justify-center items-center pr-[1px] pt-[1px]">
            {number}
          </p>
          <p className="title3 text-grey7">요청 사항이 있다면 남겨주세요.</p>
        </div>
        <div className="title3 text-primary_orange1">
          {inputLength}
          <span className="caption1 text-grey3">/100</span>
        </div>
      </article>
      <textarea
        name="request"
        id="requestArea"
        placeholder="가게 사장님께 남기고 싶은 말을 써주세요!"
        className="w-full p-4 caption3 rounded-[10px] border border-grey3 h-[90px]"
        value={inputValue}
        onChange={handleChange}
      ></textarea>
    </section>
  );
}
