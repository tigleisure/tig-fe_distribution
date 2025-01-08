'use client';
import { useEffect, useState } from 'react';
import { bannerArray, bannerLinkArray } from '@constant/bannerConstants';

export default function HomeBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isBannerClicked, setIsBannerClicked] = useState(false);
  const CurrentBannerSVG = bannerArray[currentBanner];

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerArray.length);
  };

  // 필요시 사용, 현재 클릭으로 배너를 이동하지 않아서 필요 없음
  // const prevBanner = () => {
  //   setCurrentBanner(
  //     (prev) => (prev - 1 + bannerArray.length) % bannerArray.length
  //   );
  // };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (!isBannerClicked) {
      timer = setInterval(nextBanner, 3000);
    }
    return () => clearInterval(timer);
  }, [isBannerClicked]);

  return (
    <div
      className="cursor-pointer relative mb-5"
      onClick={() => window.open(bannerLinkArray[currentBanner], '_blank')}
      onMouseEnter={() => setIsBannerClicked(true)}
      onMouseLeave={() => setIsBannerClicked(false)}
    >
      <CurrentBannerSVG />
      <div className="absolute bottom-[14px] right-5 bg-black bg-opacity-50 text-white px-2 py-1 rounded  caption4">
        {currentBanner + 1}&nbsp;&nbsp;|&nbsp;&nbsp;{bannerArray.length}
      </div>
    </div>
  );
}
