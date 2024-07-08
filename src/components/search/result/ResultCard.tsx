import Image from 'next/image';
import { title } from 'process';
import { ResultCardProps } from 'types/search/result/searchResult';
import StarSVG from '@public/svg/star.svg';
import EmptyHeartSVG from '@public/svg/emptyHeart.svg';
import FillHeartSVG from '@public/svg/fillHeart.svg';
import DiscountSVG from '@public/svg/discount.svg';
import Link from 'next/link';
import { cn } from '@utils/cn';

export default function ResultCard({
  clubName,
  clubId,
  location,
  rating,
  reviewCount,
  price,
  gameType,
  isEvent = false,
  isHeart = false,
  image,
  isLast = false,
}: ResultCardProps) {
  return (
    <Link
      href={`/detail-page/${clubId}`}
      className={cn("w-full h-[168px] flex gap-4 p-5 border-b border-grey2 max-w-[480px] min-w-[360px]",{
        'pb-[60px] h-fit': isLast
      })}
    >
      <div className="relative shrink-0">
        <Image src={image} alt={clubName} width={128} height={128} />
        {isEvent && <DiscountSVG className="absolute top-2 left-2" />}
        {isHeart ? (
          <FillHeartSVG className="absolute bottom-2 right-2" />
        ) : (
          <EmptyHeartSVG className="absolute bottom-2 right-2" />
        )}
      </div>
      <div className="w-full flex flex-col justify-between h-full">
        <div className="w-full h-fit flex flex-col gap-[10px]">
          <div className="w-full flex flex-col gap-1">
            <p className="title3 text-grey7">{clubName}</p>
            {/* max-w 조금 더 최적화 필요할 듯 */}
            <p className="body4 text-grey5 truncate max-w-[180px]">
              {location}
            </p>
          </div>
          <div className="flex gap-[6px] h-[25px]">
            <p className="bg-primary_orange2 text-primary_orange1 title4 gap-[2px] w-[44px] h-[25px] flex justify-center items-center">
              <StarSVG />
              {rating}
            </p>
            <p className="caption3 text-grey5">{reviewCount}명 평가</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="headline2 text-grey7">{price}</p>
          <p className="body4 grey4">{gameType}당 가격</p>
        </div>
      </div>
    </Link>
  );
}
