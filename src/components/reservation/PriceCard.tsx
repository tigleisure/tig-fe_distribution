interface PriceCardProps {
  price: string;
}

export default function PriceCard({ price }: PriceCardProps) {
  return (
    <section className="w-full px-5 pt-5 pb-[98px] flex flex-col gap-1 items-end">
      <p className="headline1 text-status_red1">{price}원</p>
      <p className="caption2 text-grey5">업체에서 확인 후 예약 확정</p>
    </section>
  );
}
