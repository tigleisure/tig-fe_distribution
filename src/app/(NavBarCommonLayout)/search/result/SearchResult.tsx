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
import { formatDate, parse, set } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { ResultCardProps } from 'types/search/result/searchResult';
import { useGetUnLoginUserSearchedResult } from '@apis/search/getUnLoginUserSearchedResult';

const isResult = true;

export function SearchResult() {
  const [searchResult, setSearchResult] = useState<ResultCardProps[]>([]);
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
  const [currentLociation, setCurrentLocation] = useState({
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
    if (selectedOption === '추천순') {
      setSearchResult(originalSearchResult);
    } else if (selectedOption === '인기순') {
      const sortedResult = searchResult.sort((a, b) => {
        return b.avgRating - a.avgRating;
      });
      setSearchResult((prev) => sortedResult);
      console.log(sortedResult);
    } else if (selectedOption === '가까운순') {
      const sortedResult = searchResult.sort((a, b) => {
        return (a.distance || 0) - (b.distance || 0);
      });
      setSearchResult((prev) => sortedResult);
      console.log(sortedResult);
    } else if (selectedOption === '고가순') {
      const sortedResult = searchResult.sort((a, b) => {
        return a.price - b.price;
      });
      setSearchResult((prev) => sortedResult);
      console.log(sortedResult);
    } else if (selectedOption === '저가순') {
      const sortedResult = searchResult.sort((a, b) => {
        return b.price - a.price;
      });
      setSearchResult((prev) => sortedResult);
      console.log(sortedResult);
    } else if (selectedOption === '리뷰많은순') {
      const sortedResult = searchResult.sort((a, b) => {
        return b.ratingCount - a.ratingCount;
      });
      setSearchResult((prev) => sortedResult);
      console.log(sortedResult);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      console.log('로그인 유저');
      console.log(loginUserSearchResult);
      setCurrentLocation({
        latitude: loginUserSearchResult?.result.avgLatitude || 37.55527,
        longitude: loginUserSearchResult?.result.avgLongitude || 126.9366,
      });
      setSearchResult(loginUserSearchResult?.result.searchList || []);
      setOriginalSearchResult(
        loginUserSearchResult?.result.searchList || []
      );
    } else {
      console.log('비로그인 유저');
      setCurrentLocation({
        latitude: unLoginUserSearchResult?.result.avgLatitude || 37.55527,
        longitude:
          unLoginUserSearchResult?.result.avgLongitude || 126.9366,
      });
      setSearchResult(unLoginUserSearchResult?.result.searchList || []);
      setOriginalSearchResult(
        unLoginUserSearchResult?.result.searchList || []
      );
    }
  }, [loginUserSearchResult, unLoginUserSearchResult, searchResult]);

  const selectedTab = useTab((state) => state.selectedTab);

  useEffect(() => {
    if (selectedTab == '전체') {
      setSearchResult(originalSearchResult);
      return;
    } else {
      const filteredResultCards = originalSearchResult.filter(
        (result) => categoryMapEngToKor[result.category] === selectedTab
      );
      setSearchResult(filteredResultCards);
    }
  }, [selectedTab]);

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
          locationArray={searchResult.map((result) => ({
            latitude: result.latitude || 0,
            longitude: result.longitude || 0,
          }))}
          currentLatitude={currentLociation.latitude}
          currentLongitude={currentLociation.longitude}
        />
      )}
      {isResult && isBottomSheetOpen && (
        <BottomSheet
          results={searchResult}
          handleMyLocation={handleMyLocation}
        />
      )}
      {/* <ResultCard {...DUMMYRESULTS[0]} /> */}
      {!isBottomSheetOpen && (
        <PinCard
          PinCard={searchResult[pinCardIndex]}
          handleMyLocation={handleMyLocation}
        />
      )}
      {!isResult && <NoSearchResult />}
      {/* <NavBar /> */}
    </div>
  );
}
