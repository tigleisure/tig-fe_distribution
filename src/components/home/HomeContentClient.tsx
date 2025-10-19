'use client';
import { Suspense } from 'react';
import Tabs from '@components/all/Tabs/Tabs';
import { mainArray } from '@constant/constant';
import SearchHeader from '@components/all/SearchHeader';
import HomeCardList from '@components/home/HomeCardList';
import PackageCardList from '@components/home/PackageCardList';
import useGeolocation from '@hooks/home/useGeoLocation';
import usePackageLocation from '@hooks/home/usePackageLocation';
import Footer from '@components/all/Footer/Footer';
import { useScroll } from '@hooks/useScroll';
import useTab from '@store/tabNumberStore';
import SportsUIList from './SportsUIList';
import PackageUIList from './PackageUIList';

const UIListSkeleton = () => {
  return (
    <div className="w-full h-[198px] flex flex-col gap-4 px-[30px] pb-[20px] border-b border-grey2 mb-[20px]">
      <div className="w-full justify-between flex">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div className="w-[48px] h-[48px] rounded-full bg-gray-200 animate-pulse" />
            <div className="w-[40px] h-[16px] bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
      <div className="w-full justify-between flex">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div className="w-[48px] h-[48px] rounded-full bg-gray-200 animate-pulse" />
            <div className="w-[40px] h-[16px] bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

const HomeCardListSkeleton = () => {
  return (
    <section className="flex flex-col shrink-0 gap-5 ml-5 mb-[60px]">
      <div className="w-full flex">
        <div className="h-[24px] bg-gray-200 rounded w-[200px] animate-pulse" />
      </div>
      <div className="w-full flex gap-[10px] overflow-x-scroll pr-[20px]">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="w-[152px] flex flex-col gap-[6px] shrink-0"
          >
            <div className="w-[152px] h-[152px] rounded-[10px] bg-gray-200 animate-pulse" />
            <div className="flex gap-[6px] mt-[6px]">
              <div className="h-[18px] bg-gray-200 rounded w-2/3 animate-pulse" />
              <div className="h-[18px] bg-gray-200 rounded w-[40px] shrink-0 animate-pulse" />
            </div>
            <div className="h-[16px] bg-gray-200 rounded w-[80px] animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
};

const DataContent = ({ isLogin }: { isLogin: boolean }) => {
  const { clubCards, recommendClubCards } = useGeolocation(isLogin);
  const { packageCards, recommendPackageCards } = usePackageLocation(isLogin);
  const currentTab = useTab((state) => state.selectedTab);

  return (
    <>
      {currentTab === '스포츠' && (
        <>
          <HomeCardList
            title="근처에서 즐길 수 있는 스포츠예요"
            Card={clubCards}
          />
          <HomeCardList title="이런 스포츠 어때요?" Card={recommendClubCards} />
        </>
      )}
      {currentTab === '패키지' && (
        <>
          <PackageCardList
            title="추천하는 서비스에요"
            Card={recommendPackageCards}
          />
        </>
      )}
    </>
  );
};

export default function HomeContentClient({
  isLogin,
  children,
}: {
  isLogin: boolean;
  children: React.ReactNode;
}) {
  const MAINARRAY = mainArray;
  const { isVisible } = useScroll();
  const currentTab = useTab((state) => state.selectedTab);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* SearchHeader는 내부에서 absolute top-0을 쓰므로 spacer로 영역 확보 */}
      <SearchHeader isHomeOrResultPage className="sticky" />

      {/* Tabs: 오타 수정(sticky transition-transform) 및 top을 헤더 높이만큼 지정 */}
      <Tabs
        tabArray={MAINARRAY}
        from="home"
        className={`sticky transition-transform duration-300 ease-in-out z-[9] top-[58px] ${
          isVisible ? 'translate-y-0' : '-translate-y-300'
        }`}
      />

      {children}

      {/* UI 카테고리 리스트: 의도적으로 스켈레톤 노출 */}
      <Suspense fallback={<UIListSkeleton />}>
        {currentTab === '스포츠' && <SportsUIList />}
        {currentTab === '패키지' && <PackageUIList />}
      </Suspense>

      {/* 데이터 카드 리스트 */}
      <Suspense fallback={<HomeCardListSkeleton />}>
        <DataContent isLogin={isLogin} />
      </Suspense>

      <Footer />
    </div>
  );
}
