'use client';
import { useGetLoginUserSearchedResult } from '@apis/search/getLoginUserSearchedResult';
import NavBar from '@components/all/NavBar/NavBar';
import SearchHeader from '@components/all/SearchHeader';
import Tabs from '@components/all/Tabs/Tabs';
import BottomSheet from '@components/search/result/BottomSheet';
import FilterHeader from '@components/search/result/FilterHeader';
import NaverMap from '@components/search/result/NaverMap';
import NoSearchResult from '@components/search/result/NoSearchResult';
import PinCard from '@components/search/result/PinCard';
import ResultCard from '@components/search/result/ResultCard';
import { allleisureArray, categoryMapEngToKor } from '@constant/constant';
import { useBottomSheetStore } from '@store/bottomSheetStore';
import { useFilterOptionStore } from '@store/filterOptionStore';
import { usePinCardIndexStore } from '@store/pinCardIndexStore';
import useTab from '@store/tabNumberStore';
import { formatDate, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ResultCardProps } from 'types/search/result/searchResult';
import { useGetUnLoginUserSearchedResult } from '@apis/search/getUnLoginUserSearchedResult';

const isResult = true;

export function SearchResult() {
  const [filteredSearchResult, setFilteredSearchResult] = useState<
    ResultCardProps[]
  >([]);
  const selectedOption = useFilterOptionStore((state) => state.filterOption);
  const [originalSearchResult, setOriginalSearchResult] = useState<
    ResultCardProps[]
  >([]);
  const tabArray = allleisureArray;
  const isBottomSheetOpen = useBottomSheetStore(
    (state) => state.isBottomSheetOpen
  );
  const pinCardIndex = usePinCardIndexStore((state) => state.pinCardIndex);
  const setIsBottomSheetOpen = useBottomSheetStore(
    (state) => state.setIsBottomSheetOpen
  );
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.55527,
    longitude: 126.9366,
  });
  const searchParams = useSearchParams();
  const { search, date, adultCount, teenagerCount, kidsCount } =
    Object.fromEntries(searchParams.entries());
  const parsedDate = parse(date, "yyyy-MM-dd'T'HH:mm:ss", new Date());
  const formattedDate = formatDate(parsedDate, 'M.dd (EEE)', { locale: ko });
  const { data: loginUserSearchResult } = useGetLoginUserSearchedResult(search);
  const { data: unLoginUserSearchResult } =
    useGetUnLoginUserSearchedResult(search);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setCurrentLocation({
        latitude: loginUserSearchResult?.result.avgLatitude || 37.55527,
        longitude: loginUserSearchResult?.result.avgLongitude || 126.9366,
      });
      setOriginalSearchResult(loginUserSearchResult?.result.searchList || []);
    } else {
      setCurrentLocation({
        latitude: unLoginUserSearchResult?.result.avgLatitude || 37.55527,
        longitude: unLoginUserSearchResult?.result.avgLongitude || 126.9366,
      });
      setOriginalSearchResult(unLoginUserSearchResult?.result.searchList || []);
    }
  }, [loginUserSearchResult, unLoginUserSearchResult]);

  const selectedTab = useTab((state) => state.selectedTab);

  const filterAndSortResults = () => {
    let result = [...originalSearchResult];

    if (selectedTab !== '전체') {
      result = result.filter(
        (item) => categoryMapEngToKor[item.category] === selectedTab
      );
    }

    if (selectedOption === '추천순') {
      setFilteredSearchResult(result);
    } else if (selectedOption === '인기순') {
      result.sort((a, b) => b.avgRating - a.avgRating);
    } else if (selectedOption === '가까운순') {
      result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else if (selectedOption === '고가순') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedOption === '저가순') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedOption === '리뷰많은순') {
      result.sort((a, b) => b.ratingCount - a.ratingCount);
    }

    setFilteredSearchResult(result);
  };

  useEffect(() => {
    filterAndSortResults();
  }, [selectedOption, selectedTab, originalSearchResult]);

  useEffect(() => {
    setIsBottomSheetOpen(true);
  }, [selectedTab]);

  const handleMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  console.log(filteredSearchResult);

  return (
    <div className="w-full h-full flex justify-center items-center text-[200px]">
      <SearchHeader
        result
        placeholder={`${search}, ${formattedDate}${
          adultCount === '0' ? '' : `, 성인 ${adultCount}명`
        }${teenagerCount === '0' ? '' : `, 청소년 ${teenagerCount}명`}${
          kidsCount === '0' ? '' : `, 어린이 ${kidsCount}명 `
        }`}
        isHomeOrResultPage
      />
      <Tabs
        tabArray={tabArray}
        rounded
        from="search"
        className="w-full px-5 top-[58px]"
      />
      <FilterHeader />
      {isResult && (
        <NaverMap
          locationArray={filteredSearchResult.map((result) => ({
            latitude: result.latitude || 0,
            longitude: result.longitude || 0,
          }))}
          currentLatitude={currentLocation.latitude}
          currentLongitude={currentLocation.longitude}
        />
      )}
      {isResult && isBottomSheetOpen && (
        <BottomSheet
          results={filteredSearchResult}
          handleMyLocation={handleMyLocation}
        />
      )}
      {!isBottomSheetOpen && (
        <PinCard
          PinCard={filteredSearchResult[pinCardIndex]}
          handleMyLocation={handleMyLocation}
        />
      )}
      {!isResult && <NoSearchResult />}
    </div>
  );
}
