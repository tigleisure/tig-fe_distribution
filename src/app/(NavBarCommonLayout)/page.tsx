'use client';

import { useEffect, useRef, useState } from 'react';
import Modal from '@components/all/Modal';
import Tabs from '@components/all/Tabs/Tabs';
import { homeleisureArray, mainArray } from '@constant/constant';
import SearchHeader from '@components/all/SearchHeader';
import HomeBannerSVG from '@public/svg/homeBanner.svg';
import HomeCardList from '@components/home/HomeCardList';
import TigLoadingPage from '@components/all/TigLoadingPage';
import useGeolocation from '@hooks/home/useGeoLocation';
import Footer from '@components/all/Footer/Footer';
import UIList from '@components/home/UIList';
import { usePostHomeForUnlogin } from '@apis/home/postHomeForUnlogin';
import { usePostHomeForLogin } from '@apis/home/postHomeForLogin';

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const MAINARRAY = mainArray;
  const { mutate: mutateForUnlogin, isSuccess:IsUnloginMuateSuccess } = usePostHomeForUnlogin();
  const { mutate: mutateForLogin, isSuccess:IsLoginMuateSuccess } = usePostHomeForLogin();
  const { clubCards, recommendClubCards } = useGeolocation(mutateForUnlogin, mutateForLogin);
  const isSuccess = IsUnloginMuateSuccess || IsLoginMuateSuccess;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const controlNavbar = () => {
      const currentScrollY = mainElement.scrollTop;
      if (currentScrollY > lastScrollY) {
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
          <div className="w-full max-w-[640px] mt-[111px] mb-5">
            <HomeBannerSVG className="w-full h-auto" />
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