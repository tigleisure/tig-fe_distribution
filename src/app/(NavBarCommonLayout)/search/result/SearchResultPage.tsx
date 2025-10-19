'use client';
import SearchHeader from '@components/all/SearchHeader';
import Tabs from '@components/all/Tabs/Tabs';
import BottomSheet from '@components/search/result/BottomSheet';
import FilterHeader from '@components/search/result/FilterHeader';
import NaverMap from '@components/search/result/NaverMap';
import NoSearchResult from '@components/search/result/NoSearchResult';
import PinCard from '@components/search/result/PinCard';
import ResultCard from '@components/all/ResultCard';
import {
  allleisureArray,
  allpackageArray,
  baseballArray,
  golfArray,
  pocketballArray,
  squashArray,
  subtabArrays,
  tennisArray,
} from '@constant/constant';
import { formatDate, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSearchParams } from 'next/navigation';
import { useSearchResult } from '@hooks/search/result/useSearchResult';
import { useEffect, useState } from 'react';
import UITabs from '@components/all/UITabs/UITabs';
import useTab from '@store/tabNumberStore';
import useSubTab from '@store/subTabNumberStore';
import { useLocation } from '@hooks/useLocation';

interface userCurrentPingPositionProp {
  latitude: number;
  longitude: number;
}

export default function SearchResultPage({ isLogin }: { isLogin: boolean }) {
  const currentTab = useTab((state) => state.selectedTab);
  const subtabArray = subtabArrays[currentTab] || [];
  const { location } = useLocation();
  const searchParams = useSearchParams();
  const { search, date, time, isKeyword, from } = Object.fromEntries(
    searchParams.entries()
  );
  const tabArray =
    from === 'sports'
      ? allleisureArray
      : allpackageArray.filter((t) => t !== '전체');
  const parsedDate = parse(date, "yyyy-MM-dd'T'HH:mm:ss", new Date());
  const formattedDate = formatDate(parsedDate, 'M.dd (EEE)', { locale: ko });
  const formatDayOfWeek = formatDate(parsedDate, 'EEE').toUpperCase();
  const {
    currentLocation,
    filteredSearchResult,
    handleMyLocation,
    pinCardIndex,
    isBottomSheetOpen,
    isResult,
    recommendedResult,
  } = useSearchResult(
    search,
    isKeyword,
    formatDayOfWeek,
    isLogin,
    (from as 'sports' | 'package') || 'sports'
  );
  const [isCurrentLocationUIClicked, setIsCurrentLocationUIClicked] =
    useState<boolean>(false);

  const handleClickCurrentLocationUIButton = () => {
    setIsCurrentLocationUIClicked((prev) => !prev);
  };

  return (
    <main className="w-full h-[100dvh] flex flex-col overflow-hidden">
      <SearchHeader
        result
        placeholder={from === 'sports' ? `${decodeURIComponent(search)}, ${formattedDate}` : `${formattedDate}`}
        isHomeOrResultPage
      />
      <UITabs
        tabArray={tabArray}
        from="searchMain"
        className="w-full px-5 top-[58px]"
      />
      <FilterHeader />
      {from === 'sports' && isResult && (
        <NaverMap
          locationArray={filteredSearchResult.map((result) => ({
            latitude: result.latitude || 0,
            longitude: result.longitude || 0,
          }))}
          userCurrentPingPosition={location}
          currentLatitude={currentLocation.latitude}
          currentLongitude={currentLocation.longitude}
          isCurrentLocationUIClicked={isCurrentLocationUIClicked}
        />
      )}
      {from === 'sports' && isResult && isBottomSheetOpen && (
        <BottomSheet
          from={from}
          results={filteredSearchResult}
          handleMyLocation={handleMyLocation}
          date={date}
          handleClickCurrentLocationUIButton={
            handleClickCurrentLocationUIButton
          }
        />
      )}
      {from === 'sports' && !isBottomSheetOpen && (
        <PinCard
          PinCard={filteredSearchResult[pinCardIndex]}
          handleMyLocation={handleMyLocation}
          date={date}
          handleClickCurrentLocationUIButton={
            handleClickCurrentLocationUIButton
          }
        />
      )}
      {from === 'package' && isResult && (
        <div className="w-full flex-1 overflow-y-auto pt-[200px]">
          {filteredSearchResult.map((item, idx) => {
            if(idx===filteredSearchResult.length-1) return <ResultCard key={`${item.clubId}-${idx}`} {...item} from={from} isLast={true} />
            return <ResultCard key={`${item.clubId}-${idx}`} {...item} from={from} />
          })}
        </div>
      )}
      {!isResult && <NoSearchResult results={recommendedResult} from={from as 'sports' | 'package'} />}
    </main>
  );
}
