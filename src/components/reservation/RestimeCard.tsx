'use client';
import GreyRecSVG from '@public/svg/greyRec.svg';
import Orange1RecSVG from '@public/svg/orange1Rec.svg';
import Orange2RecSVG from '@public/svg/orange2Rec.svg';
import TimeSelectCard from './TimeSelectCard';
import { useEffect, useState } from 'react';
import { useTimeReservationStore } from '@store/makeReservationInfo';
import { useSelectedDate } from '@store/selectedDateStore';
import { generateTimeSlots } from '@utils/generateTimeSlots';
import InfoCard from '@components/all/InfoCard';
import { start } from 'repl';

export default function RestimeCard({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) {
  console.log(startTime, endTime);
  const [timeSlotList, setTimeSlotList] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<boolean[]>([]);
  // MVP에서는 선택불가능한 시간 없음
  const [DUMMYISDISABLE, setDUMMYISDISABLE] = useState<boolean[]>([]);

  useEffect(() => {
    const generatedTimeSlots = generateTimeSlots(startTime, endTime);
    setTimeSlotList(generatedTimeSlots);
    setSelectedIdx(Array(generatedTimeSlots.length).fill(false));
    setDUMMYISDISABLE(Array(generatedTimeSlots.length).fill(false));
  }, [startTime, endTime]);
  const selectedDate = useSelectedDate((state) => state.selectedDate);
  const timeReservationInfo = useTimeReservationStore(
    (state) => state.timeReservationInfo
  );
  const setTime = useTimeReservationStore(
    (state) => state.setTimeReservationInfo
  );

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
        const hasDisabledBetween = DUMMYISDISABLE.slice(
          lastSelectedIndex + 1,
          idx
        ).includes(true);
        if (!hasDisabledBetween) {
          const newSelectedIdx = selectedIdx.map((b, i) =>
            i >= lastSelectedIndex && i <= idx
              ? true
              : selectedIdx[i] === true
              ? true
              : false
          );
          setSelectedIdx(newSelectedIdx);
        } else {
          const newSelectedIdx = selectedIdx.map((b, i) =>
            i === idx ? true : false
          );
          setSelectedIdx(newSelectedIdx);
        }
      } else {
        const newSelectedIdx = selectedIdx.map((b, i) =>
          i === idx ? true : false
        );
        setSelectedIdx(newSelectedIdx);
      }
    } else {
      const newSelectedIdx = selectedIdx.map((b, i) => (i === idx ? true : b));
      setSelectedIdx(newSelectedIdx);
    }
  };

  useEffect(() => {
    const selectedIndices = selectedIdx
      .map((isSelected, index) => (isSelected ? index : null))
      .filter((val) => val !== null);
    if (selectedIndices.length > 0) {
      // 마지막 시간에 +30분
      const [hours, minutes] = timeSlotList[
        selectedIndices[selectedIndices.length - 1] || 0
      ]
        .split(':')
        .map(Number);
      let newMinutes = minutes + 30;
      let newHours = hours;
      if (newMinutes >= 60) {
        newMinutes -= 60;
        newHours += 1;
      }
      const formattedHours = String(newHours).padStart(2, '0');
      const formattedMinutes = String(newMinutes).padStart(2, '0');

      const newEndTime = `${selectedDate.slice(
        0,
        11
      )}${formattedHours}:${formattedMinutes}:00`;
      setTime({
        ...timeReservationInfo,
        startTime: `${selectedDate.slice(0, 11)}${
          timeSlotList[selectedIndices[0] || 0]
        }:00`,
        endTime: newEndTime,
      });
    }
  }, [selectedIdx]);

  return (
    <section className="w-full flex flex-col gap-[14px] px-5 py-[40px] border-b border-grey2">
      <InfoCard number={2} content="시간을 선택해주세요." />
      <div className="overflow-x-scroll flex">
        {timeSlotList.map((time, idx) => {
          if (idx === 0)
            return (
              <TimeSelectCard
                key={time}
                time={time}
                isEven={idx % 2 === 1}
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
                isEven={idx % 2 === 1}
                disable={DUMMYISDISABLE[idx]}
                selected={selectedIdx[idx]}
                isAfternoon
                idx={idx}
                onClick={() => handleSelect(idx)}
              />
            );
          else if (idx === timeSlotList.length - 1)
            return (
              <TimeSelectCard
                key={time}
                time={time}
                isEven={idx % 2 === 1}
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
                isEven={idx % 2 === 1}
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
          <p className="title4 text-grey7">선택됨</p>
        </div>
        <div className="flex gap-1 items-center">
          <Orange2RecSVG />
          <p className="title4 text-grey7">예약가능</p>
        </div>
      </div>
    </section>
  );
}
