'use client';
import Modal from '@components/all/Modal';
import Tabs from '@components/all/Tabs/Tabs';
import {
  baseballArray,
  categoryMapEngToKor,
  golfArray,
  homeleisureArray,
  leisureArray,
  pocketballArray,
  squashArray,
  tennisArray,
} from '@constant/constant';
import SearchHeader from '@components/all/SearchHeader';
import ArrowSVG from '@public/svg/homeUI/arrow.svg';
import HomeBannerSVG from '@public/svg/homeBanner.svg';
import HomeCardList from '@components/home/HomeCardList';
import { usePostHome } from '@apis/home/postHome';
import TigLoadingPage from '@components/all/TigLoadingPage';
import useGeolocation from '@hooks/home/useGeoLocation';
import Footer from '@components/all/Footer/Footer';
import useTab from '@store/tabNumberStore';
import { use, useEffect, useState } from 'react';
import UITabs from '@components/all/UITabs/UITabs';
import FilterHeader from '@components/search/result/FilterHeader';
import ResultCard from '@components/all/ResultCard';
import { set } from 'date-fns';
import { is } from 'date-fns/locale';

export default function Home({ params }: { params: { gametype: string } }) {
  const currentTab = useTab((state) => state.selectedTab);
  const [isShowBounce, setIsShowBounce] = useState(true);
  const subtabArray =
    currentTab === '스크린골프'
      ? golfArray
      : currentTab === '당구'
      ? pocketballArray
      : currentTab === '야구'
      ? baseballArray
      : currentTab === '스쿼시'
      ? squashArray
      : currentTab === '테니스'
      ? tennisArray
      : [];
  const setCurrentTab = useTab((state) => state.setSelectedTab);
  const tabArray = leisureArray;
  const { mutate, isSuccess } = usePostHome();
  const { clubCards, recommendClubCards } = useGeolocation(mutate);
  console.log(clubCards);

  useEffect(() => {
    setCurrentTab(categoryMapEngToKor[params.gametype]);
  });

  useEffect(() => {
    setTimeout(() => {
      setIsShowBounce(false);
    }, 2500);
  }, []);

  return (
    <main className="h-full w-full flex flex-col overflow-y-scroll pb-[40px]">
      <SearchHeader isHomeOrResultPage />
      {!isSuccess && <TigLoadingPage />}
      {isSuccess && (
        <>
          <UITabs
            tabArray={tabArray}
            from="searchMain"
            className="w-full px-5 top-[58px]"
          />
          <Tabs
            tabArray={subtabArray}
            from="searchSub"
            className="w-full px-5 top-[148px]"
            rounded
          />
          {isShowBounce && (
            <div className="absolute top-[58px] left-[72px] z-[400] flex flex-col w-fit animate-bounce">
              <ArrowSVG className="ml-5" />
              <div className="relative top-[-1px] bg-grey6 text-white z-[400] body5 rounded-[30px] px-[10px] py-1">
                원하는 위치와 시간을 설정해보세요!
              </div>
            </div>
          )}
          <FilterHeader />
          <div className="pt-[232px]"></div>
          {clubCards.map((clubCard, idx) => {
            if (idx === 0)
              return <ResultCard key={clubCard.id} {...clubCard} isFirst />;
            if (idx === clubCards.length - 1)
              return <ResultCard key={clubCard.id} {...clubCard} isLast />;
            return <ResultCard key={clubCard.id} {...clubCard} />;
          })}
          {/* <div className="w-full max-w-[640px] mt-[111px] mb-5">
            <HomeBannerSVG className="w-full h-auto" />
          </div>
          {clubCards.length !== 0 && (
            <HomeCardList
              title="근처에서 즐길 수 있는 스포츠예요"
              Card={clubCards}
            />
          )} */}
          {/* <HomeCardList title="이런 스포츠 어때요?" Card={recommendClubCards} /> */}
          {/* <Footer /> */}
        </>
      )}
    </main>
  );
}
