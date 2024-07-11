'use client';

import { ReviewLowerSectionProps } from 'types/reservation-list/review/ReservationListReviewPageTypes';
import StarSVG from '@public/svg/star.svg';
import RightArrowSVG from '@public/svg/rightArrow.svg';
import ReviewLowerSection from '@components/reservation-list/review/ReviewLowerSection';
import { set } from 'date-fns';
import { forwardRef, useState } from 'react';
import { cn } from '@utils/cn';

interface VisitedReviewCardProps {
  AvgRating: number;
  RatingCount: number;
  reviewList: ReviewLowerSectionProps[];
}

// eslint-disable-next-line react/display-name
export const VisitedReviewCard = forwardRef<
  HTMLDivElement,
  VisitedReviewCardProps
>(({ AvgRating, RatingCount, reviewList }, ref) => {
  const [selectedReviewPage, setSelectedReviewPage] = useState(1);
  return (
    <section className="flex flex-col w-full px-5 py-[40px] gap-6 pb-[118px]">
      <div className="flex gap-[10px]">
        <p className="headline2 text-grey7">
          방문자 리뷰
        </p>
        <div className="flex gap-1 headline2 items-center text-primary_orange1">
          <StarSVG />
          <p>{AvgRating}</p>
          <p>({RatingCount})</p>
        </div>
      </div>
      <div className="w-full gap-[10px] flex flex-col">
        {reviewList.map((review, index) => (
          <div
            key={index + AvgRating}
            className="w-full rounded-[14px] border border-grey3 py-5 flex justify-center items-center"
          >
            <ReviewLowerSection {...review} />
          </div>
        ))}
      </div>
      <div className="w-[160px] flex self-center relative gap-1 justify-center" ref={ref}>
        {[1, 2, 3].map((number) => (
          <button
            className={cn(
              'w-6 h-6 flex justify-center items-center title4 rounded-full',
              {
                'text-white bg-grey7': selectedReviewPage === number,
                'text-grey7 bg-white': selectedReviewPage !== number,
              }
            )}
            onClick={() => {
              setSelectedReviewPage(number);
            }}
            key={number * 1000}
          >
            {number}
          </button>
        ))}
        <RightArrowSVG
          className="absolute right-0"
          onClick={() => {
            setSelectedReviewPage(3);
          }}
        />
      </div>
    </section>
  );
});
