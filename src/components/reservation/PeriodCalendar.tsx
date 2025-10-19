'use client';
import { createCalendarList } from '@utils/calender';
import { use, useEffect, useState } from 'react';
import { addMonths } from 'date-fns/addMonths';
import { subMonths } from 'date-fns/subMonths';
import { cn } from '@utils/cn';
import CalenderLeftSVG from '@public/svg/calenderLeft.svg';
import CalenderRightSVG from '@public/svg/calenderRight.svg';
import { useSearchInputInfo } from '@store/searchInfoStore';
import {
  formatDate,
  subDays,
  isAfter,
  isBefore,
  isSameDay,
  addDays,
} from 'date-fns';
import { usePathname } from 'next/navigation';
import {
  useGameReservationStore,
  useTimeReservationStore,
} from '@store/makeReservationInfo';
import { useSelectedDate } from '@store/selectedDateStore';
import CalendarSVG from '@public/svg/reservation/calendar.svg';
import { usePriceStore } from '@store/priceStore';
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export default function PeriodCalendar({ price }: { price: number }) {
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const selectedDate = useSelectedDate((state) => state.selectedDate);
  const adultCount = useGameReservationStore(
    (state) => state.gameReservationInfo.adultCount
  );
  const setPrice = usePriceStore((state) => state.setPrice);
  const [startDate, setStartDate] = useState<Date | null>(
    selectedDate ? new Date(selectedDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    selectedDate ? addDays(new Date(selectedDate), 1) : null
  );
  const [isAcceptMonth, setIsAcceptMonth] = useState(true);

  const pathname = usePathname();
  const gameReservationInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const setGameReservationInfo = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );

  const timeReservationInfo = useTimeReservationStore(
    (state) => state.timeReservationInfo
  );
  const setTimeReservationInfo = useTimeReservationStore(
    (state) => state.setTimeReservationInfo
  );

  const searchInputInfo = useSearchInputInfo((state) => state.searchInput);
  const setSearchInputInfo = useSearchInputInfo(
    (state) => state.setSearchInput
  );

  // 선택된 기간, 인원수, 가격이 모두 유효할 때 총 금액 계산
  useEffect(() => {
    if (startDate && endDate && adultCount && price) {
      const msPerDay = 24 * 60 * 60 * 1000;
      const dayCount = Math.max(
        0,
        Math.round((endDate.getTime() - startDate.getTime()) / msPerDay)
      );
      const total = dayCount * adultCount * price;
      setPrice(total);
    }
  }, [startDate, endDate, adultCount, price, setPrice]);

  const handleNextMonthButtonClick = () => {
    setCalendarMonth(addMonths(calendarMonth, 1));
  };
  const handlePrevMonthButtonClick = () => {
    setIsAcceptMonth(true);
    setCalendarMonth(subMonths(calendarMonth, 1));
  };
  const calendarList = createCalendarList(calendarMonth);
  const handleClickDate = (date: Date) => {
    if (date < subDays(new Date(), 1)) {
      return;
    }
    const formattedDate = formatDate(date, "yyyy-MM-dd'T'HH:mm:ss");

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      // 함수형 업데이트로 최신 상태 보장
      setGameReservationInfo((prev) => ({
        ...prev,
        date: formattedDate,
        endDate: null,
      }));
    } else if (startDate && !endDate) {
      if (isAfter(date, startDate)) {
        setEndDate(date);
        setGameReservationInfo((prev) => ({
          ...prev,
          endDate: formattedDate,
        }));
      } else {
        setStartDate(date);
        setEndDate(null);
        setGameReservationInfo((prev) => ({
          ...prev,
          date: formattedDate,
          endDate: null,
        }));
      }
    }

    // pathname에 따른 추가 상태 업데이트
    if (pathname.startsWith('/reservation/game')) {
      setGameReservationInfo((prev) => ({ ...prev, date: formattedDate }));
    } else if (pathname.startsWith('/reservation/time')) {
      setTimeReservationInfo((prev) => ({ ...prev, date: formattedDate }));
    } else {
      setSearchInputInfo((prev) => ({ ...prev, searchDate: formattedDate }));
    }
  };

  useEffect(() => {
    const oneYearLater = formatDate(addMonths(new Date(), 10), 'yyyy-MM');
    if (formatDate(calendarMonth, 'yyyy-MM') === oneYearLater) {
      setIsAcceptMonth(false);
    }
  }, [calendarMonth]);

  return (
    <>
      <section className="w-full flex flex-col gap-[6px] items-center self-center">
        <div className="flex justify-between gap-2 items-center mb-[14px]">
          <button onClick={handlePrevMonthButtonClick}>
            <CalenderLeftSVG />
          </button>
          <div className="title3 grey7">
            {calendarMonth.getFullYear()}년 {calendarMonth.getMonth() + 1}월
          </div>
          <button
            onClick={handleNextMonthButtonClick}
            disabled={!isAcceptMonth}
          >
            <CalenderRightSVG fill={isAcceptMonth ? '#4D5256' : '#ffffff'} />
          </button>
        </div>
        <div className="w-full flex justify-center body4">
          {daysOfWeek.map((day, idx) => (
            <div
              key={idx}
              className="w-[44px] h-[17px] flex justify-center items-center body2 text-grey3"
            >
              {day}
            </div>
          ))}
        </div>
        <div>
          {calendarList.map((week, idx) => {
            if (
              week[0].getMonth() !== calendarMonth.getMonth() &&
              week[6].getMonth() !== calendarMonth.getMonth()
            ) {
              return null;
            }
            return (
              <div key={idx} className="w-full flex">
                {week.map((day, idx) => {
                  const isPast = day < subDays(new Date(), 1);
                  const isStart = startDate && isSameDay(day, startDate);
                  const isEnd = endDate && isSameDay(day, endDate);
                  const inRange =
                    startDate &&
                    endDate &&
                    isAfter(day, startDate) &&
                    isBefore(day, endDate);
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (!isPast) handleClickDate(day);
                      }}
                      className={cn(
                        'relative w-[44px] h-[44px] flex justify-center items-center cursor-pointer body2',
                        {
                          'rounded-full bg-primary_orange1 text-white':
                            isStart || isEnd,
                          'bg-primary_orange2 text-white': inRange,
                          'text-grey3':
                            day.getMonth() !== calendarMonth.getMonth() ||
                            isPast,
                          'line-through': isPast,
                          'cursor-not-allowed': isPast,
                        }
                      )}
                    >
                      {/* range 배경 */}
                      {(inRange || isStart || isEnd) && (
                        <div
                          className={cn('absolute top-0 left-0 w-full h-full', {
                            // range의 시작
                            'bg-primary_orange2 rounded-l-full':
                              isStart && !isEnd,
                            // range의 끝
                            'bg-primary_orange2 rounded-r-full':
                              isEnd && !isStart,
                            // range 사이: 네모
                            'bg-primary_orange2': inRange && !isStart && !isEnd,
                            // 시작과 끝이 같으면(단일 선택): 원
                            'bg-primary_orange2 rounded-full':
                              isStart && isEnd === null,
                          })}
                        />
                      )}
                      {/* 날짜 원 */}
                      {(isStart || isEnd) && (
                        <div className="absolute top-0 left-0 w-full h-full bg-primary_orange1 rounded-full flex justify-center items-center z-10">
                          <span className="text-white z-20">
                            {day.getDate()}
                          </span>
                        </div>
                      )}
                      {/* 일반 날짜 */}
                      {!(isStart || isEnd) && (
                        <span
                          className={cn('relative z-10', {
                            'text-white': inRange,
                            'text-grey3':
                              day.getMonth() !== calendarMonth.getMonth() ||
                              isPast,
                            'line-through': isPast,
                            'cursor-not-allowed': isPast,
                          })}
                        >
                          {day.getDate()}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
      {/* 선택된 기간 카드 UI */}
      <div className="flex items-center justify-center gap-3">
        <div className="min-w-[140px] py-5 border border-grey2 rounded-xl flex items-center justify-center bg-white body1 text-grey7 gap-1">
          <CalendarSVG />
          {startDate
            ? `${startDate.getMonth() + 1}.${startDate.getDate()}(${
                ['일', '월', '화', '수', '목', '금', '토'][startDate.getDay()]
              })`
            : '시작일'}
        </div>
        <span className="text-2xl text-grey4">→</span>
        <div className="min-w-[140px] py-5 border border-grey2 rounded-xl flex items-center justify-center bg-white body1 text-grey7 gap-1">
          <CalendarSVG />
          {endDate
            ? `${endDate.getMonth() + 1}.${endDate.getDate()}(${
                ['일', '월', '화', '수', '목', '금', '토'][endDate.getDay()]
              })`
            : '종료일'}
        </div>
      </div>
    </>
  );
}
