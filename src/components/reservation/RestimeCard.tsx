'use client';
import InfoCard from '@components/search/InfoCard';
import GreyRecSVG from '@public/svg/greyRec.svg';
import Orange1RecSVG from '@public/svg/orange1Rec.svg';
import Orange2RecSVG from '@public/svg/orange2Rec.svg';
import TimeSelectCard from './TimeSelectCard';
import { useState } from 'react';

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

const DUMMYISSELECTED = [
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

export default function RestimeCard() {
  const [selectedIdx, setSelectedIdx] = useState(DUMMYISSELECTED);

  const handleSelect = (idx: number) => {
    // 하나라도 클릭된게 있다면
    // 새로 클릭된게 그전 클릭보다 인덱스(클릭 된 인덱스 중 마지막)가 크다면
    // 사이에 비활성화 된 것이 있는지 확인하고 없다면 그 사이에 있는 것들은 모두 클릭
    // 있다면 클릭된 것만 활성화, 나머지 비활성화
    // 새로 클릭된게 그전 클릭보다 인덱스가 작거나 같다면 클릭 된 것만 활성화
    // 하나라도 클릭된게 없다면 새로 클릭된 것만 활성화
    const hasTrue = selectedIdx.some((val) => val === true);
  if (hasTrue) {
    const lastSelectedIndex = selectedIdx.lastIndexOf(true);
    if (idx > lastSelectedIndex) {
      const hasDisabledBetween = DUMMYISDISABLE.slice(lastSelectedIndex + 1, idx).includes(true);
      if (!hasDisabledBetween) {
        const newSelectedIdx = selectedIdx.map((b, i) =>
          i >= lastSelectedIndex && i <= idx ? true : selectedIdx[i] === true ? true : false
        );
        setSelectedIdx(newSelectedIdx);
      } else {
        const newSelectedIdx = selectedIdx.map((b, i) => (i === idx ? true : false));
        setSelectedIdx(newSelectedIdx);
      }
    } else {
      const newSelectedIdx = selectedIdx.map((b, i) => (i === idx ? true : false));
      setSelectedIdx(newSelectedIdx);
    }
  } else {
    const newSelectedIdx = selectedIdx.map((b, i) => (i === idx ? true : b));
    setSelectedIdx(newSelectedIdx);
  }
  };
  return (
    <section className="w-full flex flex-col gap-[14px] px-5 py-[40px] border-b border-grey2">
      <InfoCard number={2} content="시간을 선택해주세요." />
      <div className="overflow-x-scroll flex">
        {DUMMYTIMELIST.map((time, idx) => {
          if (idx === 0)
            return (
              <TimeSelectCard
                key={time}
                time={time}
                disable={DUMMYISDISABLE[idx]}
                selected={selectedIdx[idx]}
                isFirst
                idx={idx}
                onClick={() => handleSelect(idx)}
              />
            );
          else if (time === '12:00')
            return (
              <TimeSelectCard
                key={time}
                time={time}
                disable={DUMMYISDISABLE[idx]}
                selected={selectedIdx[idx]}
                isAfternoon
                idx={idx}
                onClick={() => handleSelect(idx)}
              />
            );
          else if (idx === DUMMYTIMELIST.length - 1)
            return (
              <TimeSelectCard
                key={time}
                time={time}
                disable={DUMMYISDISABLE[idx]}
                selected={selectedIdx[idx]}
                isLast
                idx={idx}
                onClick={() => handleSelect(idx)}
              />
            );
          else
            return (
              <TimeSelectCard
                key={time}
                time={time}
                disable={DUMMYISDISABLE[idx]}
                selected={selectedIdx[idx]}
                idx={idx}
                onClick={() => handleSelect(idx)}
              />
            );
        })}
      </div>
      <div className="flex gap-[10px]">
        <div className="flex gap-1 items-center">
          <GreyRecSVG />
          <p className="title4 text-grey7">마감</p>
        </div>
        <div className="flex gap-1 items-center">
          <Orange1RecSVG />
          <p className="title4 text-grey7">예약 가능</p>
        </div>
        <div className="flex gap-1 items-center">
          <Orange2RecSVG />
          <p className="title4 text-grey7">선택됨</p>
        </div>
      </div>
    </section>
  );
}
