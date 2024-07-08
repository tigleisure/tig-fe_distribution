import ReviewsFilledStar from '@public/svg/reviewFilledStar.svg';
import ReviewsUnfilledStar from '@public/svg/reviewUnfilledStar.svg';

import { ReviewLowerSectionProps } from 'types/reservation-list/review/ReservationListReviewPageTypes';

export default function ReviewLowerSection({
  reservationUserName,
  eventDate,
  adultCount,
  youngManCount,
  kidCount,
  rating,
  rateContent,
}: ReviewLowerSectionProps) {
  return (
    <section className="w-full px-5 h-fit flex flex-col gap-y-4">
      <div className="w-full h-fit flex flex-col items-start gap-y-[6px]">
        <span className="title3 text-grey7">{reservationUserName}</span>
        <div className="flex justify-between items-center gap-x-[6px]">
          <p className="caption2 text-grey4">{eventDate}</p>
          <p className="caption2 text-grey3">|</p>
          <p className="caption2 text-grey4">
            {adultCount && `성인 ${adultCount}명 `}
            {youngManCount && `청소년 ${youngManCount}명 `}
            {kidCount && `어린이 ${kidCount}명 `}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-y-[10px]">
        <p className="w-full flex">
          {[1, 2, 3, 4, 5].map((number) =>
            number <= rating ? (
              <ReviewsFilledStar key={number} />
            ) : (
              <ReviewsUnfilledStar key={number} />
            )
          )}
        </p>
        <span className="body5 text-grey6">{rateContent}</span>
      </div>
    </section>
  );
}
