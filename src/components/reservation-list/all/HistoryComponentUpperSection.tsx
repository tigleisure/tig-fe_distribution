import NullImageSVG from '@public/svg/nullImage.svg';
import SmallCalendarSVG from '@public/svg/smallCalendar.svg';
import SmallClockSVG from '@public/svg/smallClock.svg';
import SmallPersonSVG from '@public/svg/smallPerson.svg';
import { HistoryComponentUpperSectionProps } from 'types/reservation-list/ReservationListPageTypes';
import { cn } from '@utils/cn';

export default function HistoryComponentUpperSection({
  companyName,
  companyAddress,
  eventDate,
  eventStartTime,
  eventEndTime,
  adultCount,
  youngManCount,
  kidCount,
  className,
}: HistoryComponentUpperSectionProps) {
  return (
    <section
      id="this-is-upper-section"
      className={cn('w-full h-fit flex  gap-x-4', className)}
    >
      <NullImageSVG />
      <div className="w-fit h-fit flex flex-col justify-between items-start gap-y-3">
        <div className="w-full h-fit flex flex-col justify-between items-start gap-y-1">
          <span className="title3 text-grey7">{companyName}</span>
          <span className="body4 text-grey5">{companyAddress}</span>
        </div>
        <div className="w-full h-fit flex flex-col justify-between items-start gap-y-1">
          <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
            <SmallCalendarSVG />
            <span className="body4 text-grey7">{eventDate}</span>
          </div>
          <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
            <SmallClockSVG />
            <span className="body4 text-grey7">
              {eventStartTime} ~ {eventEndTime}
            </span>
          </div>
          <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
            <SmallPersonSVG />
            <span className="body4 text-grey7">
              {adultCount && `성인 ${adultCount}명`}
              {youngManCount && `청소년 ${youngManCount}명`}
              {kidCount && `어린이 ${kidCount}명`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
