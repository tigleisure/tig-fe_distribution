'use client';
import Footer from '@components/all/Footer/Footer';
import { Package } from 'types/response/response';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from 'date-fns';
import { cn } from '@utils/cn';
import { packageArrayMapEngToKor } from '@constant/constant';
import { usePackageCards } from '@hooks/home/usePackageCards';
import StarSVG from '@public/svg/star.svg';

const PackageResultCard = ({ packageItem }: { packageItem: Package }) => {
  return (
    <Link
      href={`/detail-page/${packageItem.id}?date=${formatDate(
        new Date(),
        "yyyy-MM-dd'T'HH:mm:ss"
      )}&from=package`}
      className={cn(
        'w-full h-[168px] flex gap-4 p-5 border-b border-grey2 max-w-[480px] min-w-[360px] cursor-pointer bg-white'
      )}
    >
      <div className="relative shrink-0">
        <div className="relative w-[128px] h-[128px] rounded-[10px] overflow-hidden">
          <Image
            src={
              packageItem.imageUrls && packageItem.imageUrls.length > 0
                ? packageItem.imageUrls[0]
                : '/png/dummyImage.png'
            }
            alt={packageItem.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-between h-full">
        <div className="w-full h-fit flex flex-col gap-[10px]">
          <div className="w-full flex flex-col gap-1">
            <p className="title3 text-grey7 truncate">{packageItem.name}</p>
            <p className="w-full body4 text-grey5 line-clamp-1">
              {packageItem.address}
            </p>
          </div>
          {packageItem.ratingCount !== 0 && (
            <div className="flex gap-[6px] h-[25px]">
              <p className="bg-primary_orange2 text-primary_orange1 title4 gap-[2px] w-[44px] h-[25px] flex justify-center items-center rounded-[4px]">
                <StarSVG />
                {packageItem.avgRating}
              </p>
              <p className="caption3 text-grey5 flex items-center">
                {packageItem.ratingCount}명 평가
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="headline2 text-grey7">
            {Number(packageItem.price).toLocaleString()}원 ~
          </p>
          <p className="body4 text-grey4">
            <span className="body4 text-grey4">
              {packageArrayMapEngToKor[packageItem.category]}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function PackageCardContent({ isLogin }: { isLogin: boolean }) {
  const { renderingPackageCards } = usePackageCards(isLogin);

  return (
    <>
      <div className="w-full">
        {renderingPackageCards.map((packageItem: Package) => (
          <PackageResultCard key={packageItem.id} packageItem={packageItem} />
        ))}
      </div>
      <Footer />
    </>
  );
}
