import NullImageSVG from '@public/svg/nullImage.svg';
import SmallCalendarSVG from '@public/svg/smallCalendar.svg';
import SmallClockSVG from '@public/svg/smallClock.svg';
import SmallPersonSVG from '@public/svg/smallPerson.svg';
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
            </span>
          </div>
          <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
            <SmallClockSVG />
            <span className="body4 text-grey7">
              {parseInt(extractOnlyTime(startTime).slice(0, 2)) <= 12
                ? '오전'
                : '오후'}{' '}
              {extractOnlyTime(startTime)} {gameCount ? '시작, ' : '~ '}
              {!gameCount
                ? parseInt(extractOnlyTime(endTime).slice(0, 2)) <= 12
                  ? `오전 ${extractOnlyTime(endTime)}`
                  : `오후 ${extractOnlyTime(endTime)}`
                : `${gameCount}게임`}
              {}
            </span>
          </div>
          <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
            <SmallPersonSVG />
            <span className="body4 text-grey7 txt-overflow-ellipsis">
              {adultCount !== 0 && `성인 ${adultCount}명`}
              {adultCount !== 0 && (teenagerCount || kidsCount) !== 0 && ', '}
              {teenagerCount !== 0 && `청소년 ${teenagerCount}명`}
              {teenagerCount !== 0 && kidsCount !== 0 && ', '}
              {kidsCount !== 0 && `어린이 ${kidsCount}명`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
