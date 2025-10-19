import { Suspense } from 'react';
import PackageCard from './PackageCard';
import { Package } from 'types/response/response';
import CustomSuspense from '@providers/CustomSuspense';

const PackageCardSkeleton = () => {
  return (
    <div className="w-[152px] flex flex-col gap-[6px] shrink-0">
      <div className="w-[152px] h-[152px] rounded-[10px] bg-gray-200 animate-pulse" />
      <div className="flex gap-[6px] mt-[6px]">
        <div className="h-[18px] bg-gray-200 rounded w-2/3 animate-pulse" />
        <div className="h-[18px] bg-gray-200 rounded w-[40px] shrink-0 animate-pulse" />
      </div>
      <div className="h-[16px] bg-gray-200 rounded w-[80px] animate-pulse" />
    </div>
  );
};

interface PackageCardListProps {
  title: string;
  Card: Package[];
}

export default function PackageCardList({ title, Card }: PackageCardListProps) {
  return (
    <section className="flex flex-col shrink-0 gap-5 ml-5 mb-[60px]">
      <div className="w-full flex">
        <p className="headline2 text-grey7">{title}</p>
      </div>
      <div className="w-full flex gap-[10px] overflow-x-scroll pr-[20px]">
        <CustomSuspense
          fallback={
            <>
              {[1, 2, 3].map((index) => (
                <PackageCardSkeleton key={index} />
              ))}
            </>
          }
        >
          {Card.map((card, idx) => (
            <PackageCard key={card.imageUrls + String(idx)} {...card} />
          ))}
        </CustomSuspense>
      </div>
    </section>
  );
}
