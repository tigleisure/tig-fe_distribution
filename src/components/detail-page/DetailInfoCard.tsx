import DetailEmptyHeartSVG from '@public/svg/detailEmptyHeart.svg';
import StarSVG from '@public/svg/star.svg';
import LocationPingSVG from '@public/svg/locationPing.svg';
import CardSVG from '@public/svg/card.svg';
import TimeSVG from '@public/svg/time.svg';
import CallSVG from '@public/svg/call.svg';
import SnsSVG from '@public/svg/sns.svg';
import { forwardRef } from 'react';

interface DetailInfoCardProps {
  clubType: string;
  clubName: string;
  AvgRating: number;
  RatingCount: number;
  location: string;
  GameType: 'time' | 'game';
  price: string;
  startTime: string;
  endTime: string;
  phoneNumber: string;
  sns: string;
}

// eslint-disable-next-line react/display-name
export const DetailInfoCard = forwardRef<HTMLDivElement, DetailInfoCardProps>(
  (
    {
      clubType,
      clubName,
      AvgRating,
      RatingCount,
      location,
      GameType,
      price,
      startTime,
      endTime,
      phoneNumber,
      sns,
    },
    ref
  ) => {
    return (
      <section
        className="w-full px-5 py-[30px] flex flex-col gap-6 border-b border-grey2"
        
      >
        <div className="flex flex-col gap-[2px]">
          <p className="text-grey5 title4">{clubType}</p>
          <div className="w-full justify-between items-center flex">
            <p className="headline1">{clubName}</p>
            <DetailEmptyHeartSVG />
          </div>
          <div className="flex gap-[4px] text-primary_orange1 headline2 mt-[6px]">
            <StarSVG />
            <p>{AvgRating}</p>
            <p>({RatingCount})</p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] body2 text-grey7">
          <div className="flex gap-2">
            <LocationPingSVG />
            <p>{location}</p>
          </div>
          <div className="flex gap-2">
            <CardSVG />
            <p>
              {GameType === 'time' ? '시간' : '게임'}당 {price}원
            </p>
          </div>
          <div className="flex gap-2" ref={ref}>
            <TimeSVG />
            <p>
              {startTime} - {endTime}
            </p>
          </div>
          <div className="flex gap-2">
            <CallSVG />
            <p>{phoneNumber}</p>
          </div>
          <div className="flex gap-2">
            <SnsSVG />
            <p>{sns}</p>
          </div>
        </div>
      </section>
    );
  }
);
