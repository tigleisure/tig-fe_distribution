'use client';
import SearchHeader from '@components/all/SearchHeader';
import Tabs from '@components/all/Tabs/Tabs';
import BottomSheet from '@components/search/result/BottomSheet';
import FilterHeader from '@components/search/result/FilterHeader';
import NaverMap from '@components/search/result/NaverMap';
import NoSearchResult from '@components/search/result/NoSearchResult';
import PinCard from '@components/search/result/PinCard';
import {
  allleisureArray,
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
  const tabArray = allleisureArray;
  const currentTab = useTab((state) => state.selectedTab);
  const subtabArray = subtabArrays[currentTab] || [];
  const { location } = useLocation();
  const searchParams = useSearchParams();
  const { search, date, time, isKeyword } = Object.fromEntries(
    searchParams.entries()
  );
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
  } = useSearchResult(search, isKeyword, formatDayOfWeek, isLogin);
  const [isCurrentLocationUIClicked, setIsCurrentLocationUIClicked] =
    useState<boolean>(false);

  const handleClickCurrentLocationUIButton = () => {
    setIsCurrentLocationUIClicked((prev) => !prev);
  };

  return (
    <main className="w-full h-full flex justify-center items-center text-[200px]">
      <SearchHeader
        result
        placeholder={`${decodeURIComponent(search)}, ${formattedDate}`}
        isHomeOrResultPage
      />
      <UITabs
        tabArray={tabArray}
        from="searchMain"
        className="w-full px-5 top-[58px]"
      />
      <FilterHeader />
      {isResult && (
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
      {isResult && isBottomSheetOpen && (
        <BottomSheet
          results={filteredSearchResult}
          handleMyLocation={handleMyLocation}
          date={date}
          handleClickCurrentLocationUIButton={
            handleClickCurrentLocationUIButton
          }
        />
      )}
      {!isBottomSheetOpen && (
        <PinCard
          PinCard={filteredSearchResult[pinCardIndex]}
          handleMyLocation={handleMyLocation}
          date={date}
          handleClickCurrentLocationUIButton={
            handleClickCurrentLocationUIButton
          }
        />
      )}
      {!isResult && <NoSearchResult results={recommendedResult} />}
    </main>
  );
}
