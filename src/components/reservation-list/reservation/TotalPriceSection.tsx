interface TotalPriceProps {
  totalPrice: number;
}

export default function TotalPriceSection({ totalPrice }: TotalPriceProps) {
  return (
    <section className="w-full h-fit flex justify-between items-center">
      <span className="caption2 text-grey4">총 결제 금액</span>
      <span className="title3 text-grey7">
        {totalPrice < 0 ? 0 : totalPrice.toLocaleString()} 원
      </span>
    </section>
  );
}
