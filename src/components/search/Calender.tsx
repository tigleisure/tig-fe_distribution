'use client';
import { createCalendarList } from '@utils/calender';
import { useState } from 'react';
import { addMonths } from 'date-fns/addMonths';
import { subMonths } from 'date-fns/subMonths';
import { cn } from '@utils/cn';
import CalenderLeftSVG from '@public/svg/calenderLeft.svg'
import CalenderRightSVG from '@public/svg/calenderRight.svg'

const date = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calender() {
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [selecetedDate, setSelectedDate] = useState<Date>(new Date());
  const handleNextMonthButtonClick = () => {
    setCalendarDate(addMonths(calendarDate, 1));
  };
  const handlePrevMonthButtonClick = () => {
    setCalendarDate(subMonths(calendarDate, 1));
  };
  const calendarList = createCalendarList(calendarDate);
  return (
    <section className="w-full flex flex-col gap-[6px] items-center">
        <div className="flex justify-between gap-2 items-center mb-[14px]">
          <button onClick={handlePrevMonthButtonClick}><CalenderLeftSVG/></button>
          <div className="title3 grey7">
            {calendarDate.getFullYear()}년 {calendarDate.getMonth() + 1}월
          </div>
          <button onClick={handleNextMonthButtonClick}><CalenderRightSVG /></button>
        </div>
        <div className='w-full flex justify-center body4'>
          {date.map((day, idx) => (
            <div key={idx} className="w-[44px] h-[17px] flex justify-center items-center body2 text-grey3">
              {day}
            </div>))}
        </div>
        <div>
          {calendarList.map((week, idx) => {
            if (
              week[0].getMonth() !== calendarDate.getMonth() &&
              week[6].getMonth() !== calendarDate.getMonth()
            ) {
              return null;
            }
            return (
              <div key={idx} className="w-full flex">
                {week.map((day, idx) => (
                  <div
                    key={idx + 1}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      'w-[44px] h-[44px] grey6 flex justify-center items-center cursor-pointer body2',
                      {
                        'rounded-full bg-primary_orange1 text-white':
                          day.getMonth() === selecetedDate.getMonth() &&
                          day.getDate() === selecetedDate.getDate(),
                        'text-grey3':
                          day.getMonth() !== calendarDate.getMonth(),
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
  )
}
