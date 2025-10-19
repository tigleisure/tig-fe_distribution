import InfoCard from '@components/all/InfoCard';
import GameCountCard from './GameCountCard';
import { PackagePriceItem } from '@apis/club/getSpecificPackageInfo';

export default function UniformCard({
  prices,
  number = 4,
  from = 'uniform',
}: {
  prices: PackagePriceItem[];
  number?: number;
  from?: 'sports' | 'package' | 'uniform';
}) {
  return (
    <section className="w-full flex flex-col p-4 mt-5 border-b border-grey2">
      <InfoCard
        number={number}
        content="원하는 유니폼을 수량만큼 선택해주세요."
      />
      <div className="w-full flex flex-col gap-3 mt-5">
        {prices &&
          prices.map((price, idx) => (
            <GameCountCard
              key={idx}
              name={price.optionValue}
              price={price.price}
            />
          ))}
      </div>
    </section>
  );
}
