import NullImageSVG from '@public/svg/nullImage.svg';
import SmallCalendarSVG from '@public/svg/smallCalendar.svg';
import SmallPersonSVG from '@public/svg/smallPerson.svg';
import TicketSVG from '@public/svg/ticket.svg';
import { HistoryComponentUpperSectionProps } from 'types/reservation-list/ReservationListPageTypes';
import { cn } from '@utils/cn';
import {
  formatReservationShowingDate,
  extractOnlyTime,
} from '@utils/formatDate';
import Image from 'next/image';

export default function HistoryComponentUpperSection({
  clubName,
  clubAddress,
  date,
  startTime,
  endTime,
  gameCount,
  adultCount,
  teenagerCount,
  kidsCount,
  className,
  imageUrls,
  gameDescription,
  ...props
}: HistoryComponentUpperSectionProps) {
  return (
    <section
      id="this-is-upper-section"
      className={cn('w-full h-fit flex  gap-x-4 cursor-pointer', className)}
      {...props}
    >
      <div className="relative w-[106px] h-[106px] rounded-[10px] overflow-hidden">
        <Image
          src={imageUrls ? imageUrls[0] : '/png/dummyImage.png'}
          alt="업체 사진"
          fill
        />
      </div>
      <div className="h-fit flex flex-col justify-between items-start gap-y-3 grow txt-overflow-ellipsis">
        <div className="w-full h-fit flex flex-col justify-between items-start gap-y-1">
          <span className="w-full title3 text-grey7 txt-overflow-ellipsis">
            {clubName ? clubName : 'no club name'}
          </span>
          <span className="w-full body4 text-grey5 txt-overflow-ellipsis">
            {clubAddress ? clubAddress : 'no club address'}
          </span>
        </div>
        <div className="w-full h-fit flex flex-col justify-between items-start gap-y-1">
          <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
            <SmallCalendarSVG />
            <span className="body4 text-grey7">
              {formatReservationShowingDate(date)}
              {' '}
              {parseInt(extractOnlyTime(startTime).slice(0, 2)) <= 12
                ? '오전'
                : '오후'}{' '}
              {extractOnlyTime(startTime)} 시작
            </span>
          </div>
          <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
            <TicketSVG />
            <span className="body4 text-grey7 txt-overflow-ellipsis">
              {gameDescription}
            </span>
          </div>
          <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
            <SmallPersonSVG />
            <span className="body4 text-grey7">
              {adultCount !== 0 && `${adultCount}명`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
