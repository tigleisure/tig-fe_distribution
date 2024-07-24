import DetailEmptyHeartSVG from '@public/svg/detailEmptyHeart.svg';
import DetailPageStarSVG from '@public/svg/detailPageStar.svg';
import LocationPingSVG from '@public/svg/locationPing.svg';
import CardSVG from '@public/svg/card.svg';
import TimeSVG from '@public/svg/time.svg';
import CallSVG from '@public/svg/call.svg';
import SnsSVG from '@public/svg/sns.svg';
import { forwardRef } from 'react';
import { categoryMapEngToKor } from '@constant/constant';

interface DetailInfoCardProps {
  category: string;
  clubName: string;
  avgRating: number;
  ratingCount: number;
  address: string;
  type: 'TIME' | 'GAME';
  price: number;
  businessHours: string;
  phoneNumber: string;
  snsLink: string;
}

// eslint-disable-next-line react/display-name
export const DetailInfoCard = forwardRef<HTMLDivElement, DetailInfoCardProps>(
  (
    {
      category,
      clubName,
      avgRating,
      ratingCount,
      address,
      businessHours,
      type,
      price,
      phoneNumber,
      snsLink,
    },
    ref
  ) => {
    return (
      <section
        className="w-full px-5 py-[30px] flex flex-col gap-6 border-b border-grey2"
        
      >
        <div className="flex flex-col gap-[2px]">
          <p className="text-grey5 title4">{categoryMapEngToKor[category]}</p>
          <div className="w-full justify-between items-center flex">
            <p className="headline1">{clubName}</p>
            <DetailEmptyHeartSVG />
          </div>
          <div className="flex gap-[4px] text-primary_orange1 headline2 mt-[6px]">
            <DetailPageStarSVG />
            <p>{avgRating}</p>
            <p>({ratingCount})</p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] body2 text-grey7">
          <div className="flex gap-2">
            <LocationPingSVG />
            <p>{address}</p>
          </div>
          <div className="flex gap-2">
            <CardSVG />
            <p>
              {type === 'TIME' ? '시간' : '게임'}당 {price.toLocaleString()}원
            </p>
          </div>
          <div className="flex gap-2" ref={ref}>
            <TimeSVG />
            <p>
              {businessHours}
            </p>
          </div>
          <div className="flex gap-2">
            <CallSVG />
            <p>{phoneNumber}</p>
          </div>
          <div className="flex gap-2">
            <SnsSVG />
            <p>{snsLink}</p>
          </div>
        </div>
      </section>
    );
  }
);
