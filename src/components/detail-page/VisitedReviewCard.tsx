'use client';

import { ReviewLowerSectionProps } from 'types/reservation-list/review/ReservationListReviewPageTypes';
import DetailPageStarSVG from '@public/svg/detailPageStar.svg';
import RightBlackArrowSVG from '@public/svg/rightBlackArrow.svg';
import RightGreyArrowSVG from '@public/svg/rightGreyArrow.svg';
import LeftGreyArrowSVG from '@public/svg/leftGreyArrow.svg';
import LeftBlackArrowSVG from '@public/svg/leftBlackArrow.svg';
import ReviewLowerSection from '@components/reservation-list/review/ReviewLowerSection';
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
          <DetailPageStarSVG />
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
      <div className="w-fit flex self-center relative gap-1 justify-center" ref={ref}>
      {selectedReviewPage === 1 ? <LeftGreyArrowSVG className="mr-[20px]"/> : <LeftBlackArrowSVG className="mr-[20px]"
          onClick={() => {
            setSelectedReviewPage(prev=> prev - 1);
          }}/>} 
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
        {selectedReviewPage === 3 ? <RightGreyArrowSVG className="ml-[20px]"/> : <RightBlackArrowSVG className="ml-[20px]"
          onClick={() => {
            setSelectedReviewPage(prev=> prev + 1);
          }}/>} 
      </div>
    </section>
  );
});
