import ReviewsFilledStar from '@public/svg/reviewFilledStar.svg';
import ReviewsUnfilledStar from '@public/svg/reviewUnfilledStar.svg';
import { ReviewLowerSectionProps } from 'types/reservation-list/review/ReservationListReviewPageTypes';
import { cn } from '@utils/cn';
import { formatDate } from '@utils/formatDate';

export default function ReviewLowerSection({
  reservationUserName,
  eventDate,
  adultCount,
  teenagerCount,
  kidsCount,
  rating,
  rateContent,
  className,
}: ReviewLowerSectionProps) {
  return (
    <section
      className={cn('w-full px-5 h-fit flex flex-col gap-y-4', className)}
    >
      <div className="w-full h-fit flex flex-col items-start gap-y-[6px]">
        <span className="title3 text-grey7">{reservationUserName}</span>
        <div className="flex justify-between items-center gap-x-[6px]">
          <p className="caption2 text-grey4">
            {formatDate(new Date(eventDate))}
          </p>
          <p className="caption2 text-grey3">|</p>
          <p className="caption2 text-grey4">
            {adultCount !== 0 && `성인 ${adultCount}명`}
            {adultCount !== 0 && (teenagerCount || kidsCount) !== 0 && ', '}
            {teenagerCount !== 0 && `청소년 ${teenagerCount}명`}
            {teenagerCount !== 0 && kidsCount !== 0 && ', '}
            {kidsCount !== 0 && `어린이 ${kidsCount}명`}
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
