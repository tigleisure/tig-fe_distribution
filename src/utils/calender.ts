import { addDays, addMonths, getDaysInMonth, startOfMonth, subMonths } from "date-fns";

const CALENDAR_LENGTH = 42;
const DAY_OF_WEEK = 7;

enum DayEnum {
  sunday = 0,
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
  saturday = 6,
}

interface UseCalendarProps {
  startDay?: keyof typeof DayEnum;
}

const getPrevDayCount = (date: Date, startDay: keyof typeof DayEnum) => {
  const prevDayCount = (startOfMonth(date).getDay() - DayEnum[startDay] + DAY_OF_WEEK) % DAY_OF_WEEK;
  return prevDayCount;
};

const getPrevMonthDate = (date: Date, length: number) => {
  const lastDayOfPrevMonth = getDaysInMonth(subMonths(date, 1));

  const prevDayList = Array.from({ length }).map((_, i) => {
    return addDays(new Date(date.getFullYear(), date.getMonth() - 1, lastDayOfPrevMonth - length + 1), i);
  });
  return prevDayList;
};

const getCurrentMonthDate = (date: Date) => {
  const length = getDaysInMonth(date);
  const startOfMonthDate = startOfMonth(date);
  return Array.from({ length }).map((_, i) => {
    return addDays(startOfMonthDate, i);
  });
};

const getNextDayCount = (currentDayLength: number, prevDayLength: number) => {
  return CALENDAR_LENGTH - currentDayLength - prevDayLength;
};

const getNextMonthDate = (date: Date, length: number) => {
  const firstDayOfNextMonth = startOfMonth(addMonths(date, 1));
  const nextDayList = Array.from({ length }).map((_, i) => {
    return addDays(firstDayOfNextMonth, i);
  });
  return nextDayList;
};

const flatTo2DArray = (dateList: Date[]) => {
  return dateList.reduce((acc: Date[][], cur, idx) => {
    const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(cur);
    return acc;
  }, []);
};

export const createCalendarList = (date: Date, option: UseCalendarProps = { startDay: 'sunday' }): Date[][] => {
  const { startDay = 'sunday' } = option;
  const curDayList = getCurrentMonthDate(date);

  const prevDayCount = getPrevDayCount(date, startDay);
  const prevDayList = getPrevMonthDate(date, prevDayCount);

  const nextDayCount = getNextDayCount(curDayList.length, prevDayList.length);
  const nextDayList = getNextMonthDate(date, nextDayCount);

  const flatCalendarList = prevDayList.concat(curDayList, nextDayList);
  const calendar = flatTo2DArray(flatCalendarList);
  return calendar;
};