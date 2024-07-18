'use client';
import InfoCard from '@components/search/InfoCard';
import GreyRecSVG from '@public/svg/greyRec.svg';
import Orange1RecSVG from '@public/svg/orange1Rec.svg';
import Orange2RecSVG from '@public/svg/orange2Rec.svg';
import TimeSelectCard from './TimeSelectCard';
import { useState } from 'react';
import GameSelectCard from './GameSelectCard';
import { useGameReservationStore } from '@store/makeReservationInfo';
import { set } from 'date-fns';
import { useSelectedDate } from '@store/selectedDateStore';

const DUMMYTIMELIST = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
];

const DUMMYISDISABLE = [
  false,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
];

export default function ResGameCard() {
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const selectedDate = useSelectedDate((state) => state.selectedDate);
  const GameReservationInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const setSelectedStartTime = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setSelectedStartTime({
      ...GameReservationInfo,
      startTime: `${selectedDate.slice(0, 11)}${DUMMYTIMELIST[idx]}:00`,
    });
  };
  return (
    <section className="w-full px-5 py-[40px] gap-6 flex flex-col border-b border-grey2">
      <InfoCard number={2} content="시간을 선택해주세요." />
      <div className="w-full flex gap-[10px] flex-wrap h-fit">
        {DUMMYTIMELIST.map((time, index) => (
          <GameSelectCard
            key={`${time}+game`}
            idx={index}
            onClick={handleSelect}
            disable={DUMMYISDISABLE[index]}
            selected={selectedIdx === index ? true : false}
            time={DUMMYTIMELIST[index]}
          ></GameSelectCard>
        ))}
      </div>
    </section>
  );
}
