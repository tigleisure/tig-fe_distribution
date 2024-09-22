'use client';
import Modal from '@components/all/Modal';
import Tabs from '@components/all/Tabs/Tabs';
import { categoryMapEngToKor, homeleisureArray } from '@constant/constant';
import SearchHeader from '@components/all/SearchHeader';
import HomeBannerSVG from '@public/svg/homeBanner.svg';
import HomeCardList from '@components/home/HomeCardList';
import { usePostHome } from '@apis/home/postHome';
import TigLoadingPage from '@components/all/TigLoadingPage';
import useGeolocation from '@hooks/home/useGeoLocation';
import Footer from '@components/all/Footer/Footer';
import useTab from '@store/tabNumberStore';
import { useEffect } from 'react';

export default function Home({ params }: { params: { gametype: string } }) {
  const setCurrentTab = useTab((state) => state.setSelectedTab);
  const homeArray = homeleisureArray;
  const { mutate, isSuccess } = usePostHome();
  const { clubCards, recommendClubCards } = useGeolocation(mutate);

  useEffect(() => {
    setCurrentTab(categoryMapEngToKor[params.gametype]);
  });

  return (
    <main className="h-full w-full flex flex-col overflow-y-scroll pb-[40px]">
      <SearchHeader isHomeOrResultPage />
      <Tabs tabArray={homeArray} from="home" className="top-[58px]" />
      {!isSuccess && <TigLoadingPage />}
      {isSuccess && (
        <>
          <div className="w-full max-w-[640px] mt-[111px] mb-5">
            <HomeBannerSVG className="w-full h-auto" />
          </div>
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
