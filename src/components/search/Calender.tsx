'use client';
import { createCalendarList } from '@utils/calender';
import { useEffect, useState } from 'react';
import { addMonths } from 'date-fns/addMonths';
import { subMonths } from 'date-fns/subMonths';
import { cn } from '@utils/cn';
import CalenderLeftSVG from '@public/svg/calenderLeft.svg';
import CalenderRightSVG from '@public/svg/calenderRight.svg';
import { useSearchInputInfo } from '@store/searchInfoStore';
import { formatDate, subDays } from 'date-fns';
import { usePathname } from 'next/navigation';
import {
  useGameReservationStore,
  useTimeReservationStore,
} from '@store/makeReservationInfo';
import { useSelectedDate } from '@store/selectedDateStore';

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calender() {
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const selectedDate = useSelectedDate((state) => state.selectedDate);
  const setSelectedDate = useSelectedDate((state) => state.setSelectedDate);

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

  const handleNextMonthButtonClick = () => {
    setCalendarMonth(addMonths(calendarMonth, 1));
  };
  const handlePrevMonthButtonClick = () => {
    setCalendarMonth(subMonths(calendarMonth, 1));
  };
  const calendarList = createCalendarList(calendarMonth);
  const handleClickDate = (date: Date) => {
    if (date < subDays(new Date(), 1)) {
      return;
    }
    const formattedDate = formatDate(date, "yyyy-MM-dd'T'HH:mm:ss");
    if (pathname.startsWith('/reservation/game')) {
      setGameReservationInfo({ ...gameReservationInfo, date: formattedDate });
    } else if (pathname.startsWith('/reservation/time')) {
      setTimeReservationInfo({ ...timeReservationInfo, date: formattedDate });
    } else {
      setSearchInputInfo({ ...searchInputInfo, searchDate: formattedDate });
    }
    
    if (date.getMonth() < calendarMonth.getMonth()) {
      setCalendarMonth(subMonths(calendarMonth, 1));
    } else if (date.getMonth() > calendarMonth.getMonth()) {
      setCalendarMonth(addMonths(calendarMonth, 1));
    }
    setSelectedDate(formattedDate);
  };

  return (
    <section className="w-full flex flex-col gap-[6px] items-center self-center">
      <div className="flex justify-between gap-2 items-center mb-[14px]">
        <button onClick={handlePrevMonthButtonClick}>
          <CalenderLeftSVG />
        </button>
        <div className="title3 grey7">
          {calendarMonth.getFullYear()}년 {calendarMonth.getMonth() + 1}월
        </div>
        <button onClick={handleNextMonthButtonClick}>
          <CalenderRightSVG />
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
                const isSelected =
                  day.getMonth() ===
                    parseInt(selectedDate.substring(5, 7), 10) - 1 &&
                  day.getDate() === parseInt(selectedDate.substring(8, 10), 10);
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (!isPast) handleClickDate(day);
                    }}
                    className={cn(
                      'w-[44px] h-[44px] grey6 flex justify-center items-center cursor-pointer body2',
                      {
                        'rounded-full bg-primary_orange1 text-white':
                          isSelected,
                        'text-grey3':
                          day.getMonth() !== calendarMonth.getMonth() || isPast,
                        'line-through': isPast,
                        'cursor-not-allowed': isPast,
                      }
                    )}
                  >
                    {day.getDate()}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
