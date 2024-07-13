'use client';
import { createCalendarList } from '@utils/calender';
import { useEffect, useState } from 'react';
import { addMonths } from 'date-fns/addMonths';
import { subMonths } from 'date-fns/subMonths';
import { cn } from '@utils/cn';
import CalenderLeftSVG from '@public/svg/calenderLeft.svg';
import CalenderRightSVG from '@public/svg/calenderRight.svg';
import { useSearchInputInfo } from '@store/searchInfoStore';
import { formatDate, set } from 'date-fns';
import { usePathname } from 'next/navigation';
import {
  useGameReservationStore,
  useTimeReservationStore,
} from '@store/makeReservationInfo';

const date = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calender() {
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState(
    formatDate(new Date(), 'yyyy-MM-dd')
  );
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
    const formattedDate = formatDate(date, 'yyyy-MM-dd');
    if (pathname.startsWith('/reservation/game')) {
      setGameReservationInfo({ ...gameReservationInfo, date: formattedDate });
    } else if (pathname.startsWith('/reservation/time')) {
      setTimeReservationInfo({ ...timeReservationInfo, date: formattedDate });
    } else {
      setSearchInputInfo({ ...searchInputInfo, searchDate: formattedDate });
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
        {date.map((day, idx) => (
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
              {week.map((day, idx) => (
                <div
                  key={idx + 1}
                  onClick={() => {
                    handleClickDate(day);
                  }}
                  className={cn(
                    'w-[44px] h-[44px] grey6 flex justify-center items-center cursor-pointer body2',
                    {
                      'rounded-full bg-primary_orange1 text-white':
                        day.getMonth() ===
                          parseInt(selectedDate.substring(5, 7), 10) - 1 &&
                        day.getDate() ===
                          parseInt(selectedDate.substring(8, 10), 10),
                      'text-grey3': day.getMonth() !== calendarMonth.getMonth(),
                    }
                  )}
                >
                  {day.getDate()}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
