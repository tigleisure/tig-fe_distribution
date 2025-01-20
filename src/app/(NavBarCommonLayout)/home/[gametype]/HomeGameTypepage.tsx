'use client';
import { useEffect, useState } from 'react';
import UITabs from '@components/all/UITabs/UITabs';
import SearchHeader from '@components/all/SearchHeader';
import TigLoadingPage from '@components/all/TigLoadingPage';
import ArrowSVG from '@public/svg/homeUI/arrow.svg';
import useTab from '@store/tabNumberStore';
import { categoryMapEngToKor, leisureArray } from '@constant/constant';
import CustomSuspense from '@providers/CustomSuspense';
import FilterHeader from '@components/search/result/FilterHeader';
import HomeCardContent from '@components/home/HomeCardContent';

export default function HomeGameTypepage({
  params,
  isLogin,
}: {
  params: { gametype: string };
  isLogin: boolean;
}) {
  const [isShowBounce, setIsShowBounce] = useState(true);
  const setCurrentTab = useTab((state) => state.setSelectedTab);

  useEffect(() => {
    setCurrentTab(categoryMapEngToKor[params.gametype]);
  }, [params.gametype, setCurrentTab]);

  useEffect(() => {
    setTimeout(() => {
      setIsShowBounce(false);
    }, 2500);
  }, []);

  return (
    <main className="w-full flex flex-col pb-[40px] shadow-mainShadow">
      <SearchHeader isHomeOrResultPage className="sticky" />
      {isShowBounce && (
        <div className="fixed left-[calc(50%-240px+72px)] top-[58px] z-[400] flex flex-col w-fit animate-bounce">
          <ArrowSVG className="ml-5" />
          <div className="relative top-[-1px] bg-grey6 text-white z-[400] body5 rounded-[30px] px-[10px] py-1">
            원하는 날짜와 시간을 설정해보세요!
          </div>
        </div>
      )}
      <UITabs
        tabArray={leisureArray}
        from="searchMain"
        className="w-full px-5 top-[58px] sticky"
      />
      <FilterHeader className="sticky" />
      <CustomSuspense fallback={<TigLoadingPage />}>
        <HomeCardContent isLogin={isLogin} />
      </CustomSuspense>
    </main>
  );
}
