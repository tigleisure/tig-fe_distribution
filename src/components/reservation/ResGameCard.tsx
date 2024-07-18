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
import { generateTimeSlots } from '@utils/generateTimeSlots';

// MVP에서는 선택불가능한 시간 없음
const DUMMYISDISABLE = [
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
  false,
];

export default function ResGameCard() {
  
  // 백엔드로부터 제공받은 데이터
  const statFromBackend = '10:00';
  const endFromBackend = '20:00';
  //
  const DUMMYTIMELIST = generateTimeSlots(statFromBackend, endFromBackend);
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
