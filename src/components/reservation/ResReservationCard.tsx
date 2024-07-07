'use client';
import InfoCard from '@components/search/InfoCard';
import { useSearchParams } from 'next/navigation';
import DateSVG from '@public/svg/date.svg';
import ResTimeSVG from '@public/svg/restime.svg';
import PeopleSVG from '@public/svg/people.svg';

interface ResReservationCardProps {
  date: string;
  startTime: string;
  endTime: string;
  adultCount: string;
}

export default function ResReservationCard() {
  const searchParams = useSearchParams();
  const { date, startTime, endTime, adultCount } = Object.fromEntries(
    searchParams.entries()
  );
  return (
    <section className="p-5 flex flex-col gap-6 border-b border-grey2">
      <InfoCard number={4} content="예약 정보를 확인해주세요." />
      <div className='flex flex-col gap-[10px] title3'>
        <div className="flex gap-2">
          <DateSVG />
          <p>{date}</p>
        </div>
        <div className="flex gap-2">
          <ResTimeSVG />
          <p>{startTime} - {endTime}</p>
        </div>
        <div className="flex gap-2">
          <PeopleSVG />
          <p>성인 {adultCount}명</p>
        </div>
      </div>
    </section>
  );
}
