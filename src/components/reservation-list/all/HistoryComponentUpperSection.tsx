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
  teenagerCount,
  kidsCount,
  className,
}: HistoryComponentUpperSectionProps) {
  return (
    <section
      id="this-is-upper-section"
      className={cn('w-full h-fit flex  gap-x-4', className)}
    >
      <NullImageSVG className="shrink-0" />
      <div className="h-fit flex flex-col justify-between items-start gap-y-3 grow txt-overflow-ellipsis">
        <div className="w-full h-fit flex flex-col justify-between items-start gap-y-1">
          <span className="w-full title3 text-grey7 txt-overflow-ellipsis">
            {companyName}
          </span>
          <span className="w-full body4 text-grey5 txt-overflow-ellipsis">
            {companyAddress}
          </span>
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
              {teenagerCount && `청소년 ${teenagerCount}명`}
              {kidsCount && `어린이 ${kidsCount}명`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
