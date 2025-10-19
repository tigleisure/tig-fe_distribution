import CalenderSVG from '@public/svg/reservation/calendar.svg';
import GreyCalendarSVG from '@public/svg/reservation/greyCalendar.svg';
import ClockSVG from '@public/svg/reservation/clock.svg';
import GreyClockSVG from '@public/svg/reservation/greyClock.svg';

interface DateTimePickerProps {
  label: string;
  date: Date | null;
  time: string | null;
  onDateClick: () => void;
  onTimeClick: () => void;
  formatDate: (date: Date | null) => string;
  formatTime: (time: string | null) => string;
}

export default function DateTimePicker({
  label,
  date,
  time,
  onDateClick,
  onTimeClick,
  formatDate,
  formatTime,
}: DateTimePickerProps) {
  return (
    <div className="flex gap-2 mt-6">
      <div className="w-full flex flex-col gap-3">
        {label !== '수령' && <p className="title2 text-grey7">{label} 날</p>}
        <div
          className="w-full py-5 px-4 rounded-[12px] border-[1px] title2 cursor-pointer border-grey3 flex items-center gap-1"
          onClick={onDateClick}
        >
          {date ? <CalenderSVG /> : <GreyCalendarSVG />}
          <p className={`body1 ${date ? 'text-grey7' : 'text-grey3'}`}>
            {date ? formatDate(date) : '날짜 선택'}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        {label !== '수령' && <p className="title2 text-white">{label} 시간</p>}
        <div
          className="w-full py-5 px-4 rounded-[12px] border-[1px] title2 cursor-pointer border-grey3 flex items-center gap-1"
          onClick={onTimeClick}
        >
          {time ? <ClockSVG /> : <GreyClockSVG />}
          <p className={`body1 ${time ? 'text-grey7' : 'text-grey3'}`}>
            {time ? formatTime(time) : '시간 선택'}
          </p>
        </div>
      </div>
    </div>
  );
}
