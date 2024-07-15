'use client';
import Image from 'next/image';
import { ResultCardProps } from 'types/search/result/searchResult';
import StarSVG from '@public/svg/star.svg';
import EmptyHeartSVG from '@public/svg/emptyHeart.svg';
import FillHeartSVG from '@public/svg/fillHeart.svg';
import DiscountSVG from '@public/svg/discount.svg';
import Link from 'next/link';
import { cn } from '@utils/cn';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function ResultCard({
  clubName,
  id,
  address,
  ratingSum,
  ratingCount,
  price,
  type,
  isEvent = false,
  isHeart = false,
  imageUrls,
  isLast = false,
}: ResultCardProps) {
  const router = useRouter();
  const [isHeartClicked, setIsHeartClicked] = useState(isHeart);
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    console.log('clicked');
    e.stopPropagation();
    setIsHeartClicked((prev: boolean) => !prev);
  };
  return (
    <section
      onClick={()=>{router.push(`/detail-page/${id}`)}}
      className={cn(
        'w-full h-[168px] flex gap-4 p-5 border-b border-grey2 max-w-[480px] min-w-[360px] cursor-pointer',
        {
          'pb-[60px] h-fit': isLast,
        }
      )}
    >
      <div className="relative shrink-0">
        <Image src={'/png/dummyImage.png'} alt={clubName} width={128} height={128} />
        {isEvent && <DiscountSVG className="absolute top-2 left-2" />}
        {isHeartClicked ? (
          <FillHeartSVG
            className="absolute bottom-2 right-2 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement>) => {
              handleClick(e);
            }}
          />
        ) : (
          <EmptyHeartSVG
            className="absolute bottom-2 right-2 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement>) => {
              handleClick(e);
            }}
          />
        )}
      </div>
      <div className="w-full flex flex-col justify-between h-full">
        <div className="w-full h-fit flex flex-col gap-[10px]">
          <div className="w-full flex flex-col gap-1">
            <p className="title3 text-grey7">{clubName}</p>
            <p className="w-full body4 text-grey5 line-clamp-1">{address}</p>
          </div>
          <div className="flex gap-[6px] h-[25px]">
            <p className="bg-primary_orange2 text-primary_orange1 title4 gap-[2px] w-[44px] h-[25px] flex justify-center items-center rounded-[4px]">
              <StarSVG />
              {ratingSum}
            </p>
            <p className="caption3 text-grey5">{ratingCount}명 평가</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="headline2 text-grey7">{price.toLocaleString()}원</p>
          <p className="body4 grey4">{type === 'GAME' ? '게임' : '시간'}당 가격</p>
        </div>
      </div>
    </section>
  );
}
