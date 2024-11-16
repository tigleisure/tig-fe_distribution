import { formatReservationShowingDate } from '@utils/formatDate';

interface CouponItemProps {
  discount: number;
  description: string;
  name: string;
  expireDate: string;
  couponId: number;
}

export function CouponItem({
  discount,
  description,
  name,
  expireDate,
  couponId,
}: CouponItemProps) {
  const date = formatReservationShowingDate(expireDate);
  return (
    <section className="w-eightNineWidth h-fit rounded-[10px] flex flex-col items-center gap-y-5 bg-white mb-[10px] py-5 hover:cursor-pointer">
      <div className="w-sevenEightWidth flex justify-start items-center title1">
        {discount.toLocaleString()}원
      </div>
      <div className="w-sevenEightWidth flex justify-between items-center">
        <span className="body4 text-grey7">
          [{name}] {description}
        </span>
      </div>
      <div className="w-sevenEightWidth flex justify-start items-center body4">
        {expireDate.slice(0, 4)}.{date} 까지 사용 가능
      </div>
    </section>
  );
}
