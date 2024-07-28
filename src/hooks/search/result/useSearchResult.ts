import { useGetLoginUserSearchedResult } from '@apis/search/getLoginUserSearchedResult';
import { useGetUnLoginUserSearchedResult } from '@apis/search/getUnLoginUserSearchedResult';
import { categoryMapEngToKor } from '@constant/constant';
import { useBottomSheetStore } from '@store/bottomSheetStore';
import { useFilterOptionStore } from '@store/filterOptionStore';
import { usePinCardIndexStore } from '@store/pinCardIndexStore';
import { useSearchInputInfo } from '@store/searchInfoStore';
import useTab from '@store/tabNumberStore';
import { useEffect, useState } from 'react';
import { ResultCardProps } from 'types/search/result/searchResult';

export const useSearchResult = (search: string) => {
  const [isResult, setIsResult] = useState(false);
  const [recommendedResult, setRecommendedResult] = useState<ResultCardProps[]>(
    []
  );
  const [filteredSearchResult, setFilteredSearchResult] = useState<
    ResultCardProps[]
  >([]);
  const selectedOption = useFilterOptionStore((state) => state.filterOption);
  const [originalSearchResult, setOriginalSearchResult] = useState<
    ResultCardProps[]
  >([]);
  const pinCardIndex = usePinCardIndexStore((state) => state.pinCardIndex);
  const setIsBottomSheetOpen = useBottomSheetStore(
    (state) => state.setIsBottomSheetOpen
  );
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.55527,
    longitude: 126.9366,
  });
  const isBottomSheetOpen = useBottomSheetStore(
    (state) => state.isBottomSheetOpen
  );
  const { data: loginUserSearchResult } = useGetLoginUserSearchedResult(search);
  const { data: unLoginUserSearchResult } =
    useGetUnLoginUserSearchedResult(search);

  const setSearchInput = useSearchInputInfo((state) => state.setSearchInput);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setCurrentLocation({
        latitude: loginUserSearchResult?.result.avgLatitude || 37.55527,
        longitude: loginUserSearchResult?.result.avgLongitude || 126.9366,
      });
      setOriginalSearchResult(loginUserSearchResult?.result.searchList || []);
      setIsResult(loginUserSearchResult?.result.isResult || false);
      if (!loginUserSearchResult?.result.isResult) {
        setRecommendedResult(loginUserSearchResult?.result.searchList || []);
      }
    } else {
      setCurrentLocation({
        latitude: unLoginUserSearchResult?.result.avgLatitude || 37.55527,
        longitude: unLoginUserSearchResult?.result.avgLongitude || 126.9366,
      });
      setOriginalSearchResult(unLoginUserSearchResult?.result.searchList || []);
      setIsResult(unLoginUserSearchResult?.result.isResult || false);
      if (!unLoginUserSearchResult?.result.isResult) {
        setRecommendedResult(unLoginUserSearchResult?.result.searchList || []);
      }
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

  useEffect(() => {
    return () => {
      setSearchInput({
        searchDate: '',
        searchValue: '',
        adultCount: 0,
        teenagerCount: 0,
        kidsCount: 0,
      });
    };
  }, []);

  const handleMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  return {
    filteredSearchResult,
    selectedOption,
    originalSearchResult,
    pinCardIndex,
    currentLocation,
    isBottomSheetOpen,
    isResult,
    recommendedResult,
    handleMyLocation,
  };
};
