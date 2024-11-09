'use client';

import { useEffect, useRef, useState } from 'react';
import Modal from '@components/all/Modal';
import Tabs from '@components/all/Tabs/Tabs';
import { homeleisureArray, mainArray } from '@constant/constant';
import SearchHeader from '@components/all/SearchHeader';
import HomeBannerSVG1 from '@public/svg/banner/homeBanner1.svg';
import HomeBannerSVG2 from '@public/svg/banner/homeBanner2.svg';
import HomeBannerSVG3 from '@public/svg/banner/homeBanner3.svg';
import HomeBannerSVG4 from '@public/svg/banner/homeBanner4.svg';
import HomeBannerSVG5 from '@public/svg/banner/homeBanner5.svg';
import HomeCardList from '@components/home/HomeCardList';
import TigLoadingPage from '@components/all/TigLoadingPage';
import useGeolocation from '@hooks/home/useGeoLocation';
import Footer from '@components/all/Footer/Footer';
import UIList from '@components/home/UIList';
import { usePostHomeForUnlogin } from '@apis/home/postHomeForUnlogin';
import { usePostHomeForLogin } from '@apis/home/postHomeForLogin';
import { is } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

const bannerArray: React.FunctionComponent<React.SVGProps<SVGSVGElement>>[] = [
  HomeBannerSVG1,
  HomeBannerSVG2,
  HomeBannerSVG3,
  HomeBannerSVG4,
  HomeBannerSVG5,
];

const bannerLinkArray = [
  'https://tigleisure.com/',
  'https://www.notion.so/3-000-2a2677fd096047a8b715219db39cd15d?pvs=4',
  'https://www.notion.so/10-000-5-87053ece85e2448e9744d89465dbffde?pvs=4',
  'https://www.notion.so/10-000-5-87053ece85e2448e9744d89465dbffde?pvs=4',
  'https://www.notion.so/3-000-won-discount-coupon-policy-74d16e4cb53c4c90bac604ebd03599b4?pvs=4',
];

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isBannerClicked, setIsBannerClicked] = useState(false);
  const router = useRouter();
  const CurrentBannerSVG = bannerArray[currentBanner];

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerArray.length);
  };

  const prevBanner = () => {
    setCurrentBanner(
      (prev) => (prev - 1 + bannerArray.length) % bannerArray.length
    );
  };

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (!isBannerClicked) {
      timer = setInterval(nextBanner, 3000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isBannerClicked]);
  const mainRef = useRef<HTMLDivElement>(null);
  const MAINARRAY = mainArray;
  const { mutate: mutateForUnlogin, isSuccess: IsUnloginMuateSuccess } =
    usePostHomeForUnlogin();
  const { mutate: mutateForLogin, isSuccess: IsLoginMuateSuccess } =
    usePostHomeForLogin();
  const { clubCards, recommendClubCards } = useGeolocation(
    mutateForUnlogin,
    mutateForLogin
  );
  const isSuccess = IsUnloginMuateSuccess || IsLoginMuateSuccess;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const controlNavbar = () => {
      const currentScrollY = mainElement.scrollTop;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    mainElement.addEventListener('scroll', controlNavbar);

    return () => {
      mainElement.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <main
      ref={mainRef}
      className="h-full w-full flex flex-col overflow-y-scroll pb-[40px]"
    >
      <SearchHeader isHomeOrResultPage />
      <Tabs
        tabArray={MAINARRAY}
        from="home"
        className={`absolute top-[58px] transition-transform duration-300 ease-in-out z-[9] ${
          isVisible ? 'translate-y-0' : '-translate-y-300'
        }`}
      />
      {!isSuccess && <TigLoadingPage />}
      {isSuccess && (
        <>
          <div
            className="relative w-full max-w-[640px] mt-[111px] mb-5 cursor-pointer"
            onMouseDown={() => setIsBannerClicked(true)}
            onMouseUp={() => setIsBannerClicked(false)}
            onMouseLeave={() => setIsBannerClicked(false)}
            onClick={() => {
              router.push(bannerLinkArray[currentBanner]);
            }}
          >
            <CurrentBannerSVG className="w-full h-auto" />
            <div className="absolute bottom-[14px] right-5 bg-black bg-opacity-50 text-white px-2 py-1 rounded  caption4">
              {currentBanner + 1}&nbsp;&nbsp;|&nbsp;&nbsp;{bannerArray.length}
            </div>
          </div>
          <UIList />
          {clubCards.length !== 0 && (
            <HomeCardList
              title="근처에서 즐길 수 있는 스포츠예요"
              Card={clubCards}
            />
          )}
          <HomeCardList title="이런 스포츠 어때요?" Card={recommendClubCards} />
          <Footer />
        </>
      )}
    </main>
  );
}
