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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDeleteFromWishList } from '@apis/wishlist/deleteFromWishlist';
import { useAddToWishList } from '@apis/wishlist/addToWishList';
import { formatDate } from 'date-fns';
import { motion } from 'framer-motion';
import { categoryMapEngToKor, subtabArrays } from '@constant/constant';
import path from 'path';
import { start } from 'repl';
import { getProgramDescription } from '@utils/programName';

export default function ResultCard({
  clubName,
  clubId,
  address,
  ratingSum,
  ratingCount,
  avgRating,
  category,
  prices,
  type,
  isEvent = false,
  isHeart = false,
  imageUrls = [],
  isLast = false,
  isFirst = false,
  name,
  id,
  from = 'sports',
  price,
}: ResultCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const subtabArray = subtabArrays[categoryMapEngToKor[category]] || [];
  let renderingSubtabArray = subtabArray;
  if (prices) {
    const containCategory = prices.map((price: any) =>
      getProgramDescription(price.programName)
    );
    const uniqueProgramNames = Array.from(new Set(containCategory));
    const filterSubtabArray = subtabArray.filter((item) =>
      uniqueProgramNames.includes(item)
    );
    renderingSubtabArray = filterSubtabArray;
  }

  const [isHeartClicked, setIsHeartClicked] = useState(isHeart);
  const { mutate: deleteFromWishList } = useDeleteFromWishList();
  const { mutate: addToWishList } = useAddToWishList();
  const searchParams = useSearchParams();
  const handleFillHeartClick = (e: React.MouseEvent<SVGSVGElement>) => {
    deleteFromWishList(clubId || 0);
    e.stopPropagation();
    setIsHeartClicked(false);
  };
  const handleEmptyHeartClick = (e: React.MouseEvent<SVGSVGElement>) => {
    addToWishList(clubId || 0);
    e.stopPropagation();
    if (isHeart === null) {
      router.push('/login');
      return;
    }
    setIsHeartClicked(true);
  };

  useEffect(() => {
    setIsHeartClicked(isHeart);
  }, [isHeart]);

  return (
    <section
      onClick={() => {
        if (pathname.startsWith('/home') || pathname.startsWith('/wishlist')) {
          router.push(
            `/detail-page/${clubId || id}?date=${formatDate(
              new Date(),
              "yyyy-MM-dd'T'HH:mm:ss"
            )}&from=${from}`
          );
        } else {
          router.push(
            `/detail-page/${clubId || id}?date=${searchParams.get('date')}&from=${from}`
          );
        }
      }}
      className={cn(
        'w-full h-[168px] flex gap-4 p-5 border-b border-grey2 max-w-[480px] min-w-[360px] cursor-pointer bg-white',
        {
          'mb-[60px]': isLast,
          // 'pt-[0] h-fit': isFirst,
        }
      )}
    >
      <div className="relative shrink-0">
        <div className="relative w-[128px] h-[128px] rounded-[10px] overflow-hidden">
          <Image
            src={imageUrls.length !== 0 ? imageUrls[0] : '/png/dummyImage.png'}
            alt="업체 사진"
            fill
          />
        </div>
        {isEvent && <DiscountSVG className="absolute top-2 left-2" />}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="absolute bottom-2 right-2"
        >
          {isHeartClicked ? (
            <FillHeartSVG
              className=" cursor-pointer"
              onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                handleFillHeartClick(e);
              }}
            />
          ) : (
            <EmptyHeartSVG
              className="cursor-pointer"
              onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                handleEmptyHeartClick(e);
              }}
            />
          )}
        </motion.div>
      </div>
      <div className="w-full flex flex-col justify-between h-full">
        <div className="w-full h-fit flex flex-col gap-[10px]">
          <div className="w-full flex flex-col gap-1">
            <p className="title3 text-grey7">{clubName || name}</p>
            <p className="w-full body4 text-grey5 line-clamp-1">{address}</p>
          </div>
          {ratingCount !== 0 && (
            <div className="flex gap-[6px] h-[25px]">
              <p className="bg-primary_orange2 text-primary_orange1 title4 gap-[2px] w-[44px] h-[25px] flex justify-center items-center rounded-[4px]">
                <StarSVG />
                {avgRating}
              </p>
              <p className="caption3 text-grey5 flex items-center">
                {ratingCount}명 평가
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="headline2 text-grey7">
            {from === 'package' && Number(price).toLocaleString()}
            {from === 'sports' && prices &&
              Math.min(
                ...(prices as any[]).map((obj) => obj.price)
              ).toLocaleString()}
            원 ~
          </p>
          <p className="body4 text-grey4">
            {renderingSubtabArray.map((item, index) => (
              <span key={index} className="body4 text-grey4">
                {item}
                {index < renderingSubtabArray.length - 1 && ' · '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
