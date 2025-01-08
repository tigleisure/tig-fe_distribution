'use client';
import Tabs from '@components/all/Tabs/Tabs';
import { mainArray } from '@constant/constant';
import SearchHeader from '@components/all/SearchHeader';
import HomeCardList from '@components/home/HomeCardList';
import useGeolocation from '@hooks/home/useGeoLocation';
import Footer from '@components/all/Footer/Footer';
import UIList from '@components/home/UIList';
import HomeBanner from '@components/home/HomeBanner';
import { useScroll } from '@hooks/useScroll';

export default function HomeContent() {
  const MAINARRAY = mainArray;
  const { clubCards, recommendClubCards } = useGeolocation();
  const { isVisible } = useScroll();

  return (
    <main className="w-full flex flex-col pb-[40px] bg-white shadow-mainShadow">
      <SearchHeader isHomeOrResultPage className="sticky" />
      <Tabs
        tabArray={MAINARRAY}
        from="home"
        className={`stickytransition-transform duration-300 ease-in-out z-[9] top-[58px] ${
          isVisible ? 'translate-y-0' : '-translate-y-300'
        }`}
      />
      <HomeBanner />
      <UIList />
      <HomeCardList title="근처에서 즐길 수 있는 스포츠예요" Card={clubCards} />
      <HomeCardList title="이런 스포츠 어때요?" Card={recommendClubCards} />
      <Footer />
    </main>
  );
}
