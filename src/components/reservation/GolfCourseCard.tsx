import InfoCard from '@components/all/InfoCard';
import GameCountCard from './GameCountCard';
import { PackagePriceItem } from '@apis/club/getSpecificPackageInfo';

export default function GolfCourseCard({
  prices,
  number = 4,
  from = "sports",
}: {
  prices: PackagePriceItem[];
  number?: number;
  from?: "sports" | "package";
}) {
  return (
    <section className="w-full flex flex-col p-4 mt-5 border-b border-grey2">
      <InfoCard
        number={number}
        content="원하는 게임을 인원 수 만큼 선택해주세요."
      />
      <div className="w-full flex flex-col gap-3 mt-5">
        {prices &&
          prices.map((price, idx) => (
            <GameCountCard
              key={idx}
              name={price.optionValue}
              price={price.price}
              from={from}
            />
          ))}
      </div>
    </section>
  );
}
