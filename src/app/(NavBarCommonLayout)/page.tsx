'use client';
import Modal from '@components/all/Modal';
import FullButton from '@components/all/FullButton';
import NavBar from '@components/all/NavBar/NavBar';
import Tabs from '@components/all/Tabs/Tabs';
import { categoryMapEngToKor, homeleisureArray } from '@constant/constant';
import useModal from '@store/modalStore';
import SearchHeader from '@components/all/SearchHeader';
import DummyBannerSVG from '@public/svg/dummyBanner.svg';
import HomeBannerSVG from '@public/svg/homeBanner.svg';
import Image from 'next/image';
import { HomeCardProps } from 'types/home/HomeTypes';
import HomeCardList from '@components/home/HomeCardList';
import useTab from '@store/tabNumberStore';
import { useEffect, useState } from 'react';
import { usePostHome } from '@apis/home/postHome';
import { Club } from 'types/response/response';
import Lottie from 'lottie-react';
import TigLoadingAnimation from '@public/lottie/TigLoadingAnimation.json';
import TigLoadingPage from '@components/all/TigLoadingPage';
import useGeolocation from '@hooks/home/useGeoLocation';

export default function Home() {
  const homeArray = homeleisureArray;
  const { mutate, isSuccess } = usePostHome();
  const { clubCards, recommendClubCards } = useGeolocation(mutate);

  return (
    <main className="h-full w-full flex flex-col overflow-y-scroll pb-[40px]">
      <SearchHeader isHomeOrResultPage />
      <Tabs tabArray={homeArray} from="home" className="top-[58px]" />
      {isSuccess && (
        <div className="w-full max-w-[640px] mt-[111px] p-5 mb-5">
          <HomeBannerSVG className="w-full h-auto" />
        </div>
      )}
      {!isSuccess ? (
        <TigLoadingPage />
      ) : (
        clubCards.length !== 0 && (
          <HomeCardList
            title="근처에서 즐길 수 있는 스포츠예요"
            Card={clubCards}
          />
        )
      )}

      {isSuccess && (
        <HomeCardList title="이런 스포츠 어때요?" Card={recommendClubCards} />
      )}
    </main>
  );
}
