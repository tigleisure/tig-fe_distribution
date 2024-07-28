'use client';
import Image from 'next/image';
import { ResultCardProps } from 'types/search/result/searchResult';
import StarSVG from '@public/svg/star.svg';
import EmptyHeartSVG from '@public/svg/emptyHeart.svg';
import FillHeartSVG from '@public/svg/fillHeart.svg';
import DiscountSVG from '@public/svg/discount.svg';
import Link from 'next/link';
import { cn } from '@utils/cn';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDeleteFromWishList } from '@apis/wishlist/deleteFromWishlist';
import { useAddToWishList } from '@apis/wishlist/addToWishList';

export default function ResultCard({
  clubName,
  id,
  clubId,
  address,
  ratingSum,
  ratingCount,
  avgRating,
  price,
  type,
  isEvent = false,
  isHeart = false,
  imageUrls,
  isLast = false,
  isFirst = false,
}: ResultCardProps) {
  const router = useRouter();
  const [isHeartClicked, setIsHeartClicked] = useState(isHeart);
  const { mutate: deleteFromWishList } = useDeleteFromWishList();
  const { mutate: addToWishList } = useAddToWishList();
  const handleFillHeartClick = (e: React.MouseEvent<SVGSVGElement>) => {
    console.log('fill clicked');
    deleteFromWishList(clubId || 0);
    e.stopPropagation();
    setIsHeartClicked(false);
  };
  const handleEmptyHeartClick = (e: React.MouseEvent<SVGSVGElement>) => {
    console.log('empty clicked');
    e.stopPropagation();
    if (!localStorage.getItem('accessToken')) {
      console.log('로그인이 필요합니다');
      router.push('/login');
      return;
    }
    addToWishList(clubId || 0);
    setIsHeartClicked(true);
  };

  useEffect(() => {
    setIsHeartClicked(isHeart);
  }, [isHeart]);

  return (
    <section
      onClick={() => {
        router.push(`/detail-page/${clubId}`);
      }}
      className={cn(
        'w-full h-[168px] flex gap-4 p-5 border-b border-grey2 max-w-[480px] min-w-[360px] cursor-pointer bg-white',
        {
          'pb-[60px] h-fit': isLast,
          'pt-[0] h-fit': isFirst,
        }
      )}
    >
      <div className="relative shrink-0">
        <Image
          src={'/png/dummyImage.png'}
          alt={clubName}
          width={128}
          height={128}
        />
        {isEvent && <DiscountSVG className="absolute top-2 left-2" />}
        {isHeartClicked ? (
          <FillHeartSVG
            className="absolute bottom-2 right-2 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement>) => {
              handleFillHeartClick(e);
            }}
          />
        ) : (
          <EmptyHeartSVG
            className="absolute bottom-2 right-2 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement>) => {
              handleEmptyHeartClick(e);
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
              {avgRating}
            </p>
            <p className="caption3 text-grey5 flex items-center">
              {ratingCount}명 평가
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="headline2 text-grey7">
            {price && price.toLocaleString()}원
          </p>
          <p className="body4 text-grey4">
            {type === 'GAME' ? '게임' : '시간'}당 가격
          </p>
        </div>
      </div>
    </section>
  );
}
