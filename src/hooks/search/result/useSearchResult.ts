import { useGetLoginUserSearchedResult } from '@apis/search/getLoginUserSearchedResult';
import { useGetUnLoginUserSearchedResult } from '@apis/search/getUnLoginUserSearchedResult';
import { useGetLoginUserPackageSearchedResult } from '@apis/search/getLoginUserPackageSearchedResult';
import { useGetUnLoginUserPackageSearchedResult } from '@apis/search/getUnLoginUserPackageSearchedResult';
import { categoryMapEngToKor, packageArrayMapEngToKor } from '@constant/constant';
import { useBottomSheetStore } from '@store/bottomSheetStore';
import { useFilterOptionStore } from '@store/filterOptionStore';
import { usePinCardIndexStore } from '@store/pinCardIndexStore';
import { useSearchInputInfo } from '@store/searchInfoStore';
import useTab from '@store/tabNumberStore';
import { useCallback, useEffect, useState } from 'react';
import { ResultCardProps } from 'types/search/result/searchResult';
import { formatDate } from 'date-fns';
import { timeToMinutes } from '@utils/formatDate';

export const useSearchResult = (
  search: string,
  isKeyword: string,
  formatDayOfWeek: string,
  isLogin: boolean,
  from: 'sports' | 'package'
) => {
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

  // 이것도 토큰여부를 확인할 수 있다면 두 요청 중 하나만 보내면 좋을 거 같아
  // 훅은 조건 없이 항상 같은 순서로 호출
  const { data: loginUserSportsSearchResult } = useGetLoginUserSearchedResult(
    search,
    isKeyword
  );
  const { data: loginUserPackageSearchResult } =
    useGetLoginUserPackageSearchedResult(search, isKeyword);
  const { data: unLoginUserSportsSearchResult } =
    useGetUnLoginUserSearchedResult(search);
  const { data: unLoginUserPackageSearchResult } =
    useGetUnLoginUserPackageSearchedResult(search);

  const loginUserSearchResult =
    from === 'sports'
      ? loginUserSportsSearchResult
      : loginUserPackageSearchResult;
  const unLoginUserSearchResult =
    from === 'sports'
      ? unLoginUserSportsSearchResult
      : unLoginUserPackageSearchResult;

  const setSearchInput = useSearchInputInfo((state) => state.setSearchInput);

  useEffect(() => {
    if (isLogin) {
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
  }, [isLogin, loginUserSearchResult, unLoginUserSearchResult]);

  const selectedTab = useTab((state) => state.selectedTab);

  const filterPlaces = (
    places: ResultCardProps[], // 업체 배열
    formatDayOfWeek: string
    // time: string
  ) => {
    return places.filter((place) => {
      return place.operatingHours?.some(
        (hour) => hour.dayOfWeek === formatDayOfWeek
      );
    });
  };

  const filterAndSortResults = useCallback(() => {
    let preResult = [...originalSearchResult];
    // 스포츠일 때만 요일(시간) 기반 필터링을 적용하고, 패키지에서는 전체 결과를 사용
    let result =
      from === 'sports' ? filterPlaces(preResult, formatDayOfWeek) : preResult;

    // 안전한 값 추출 유틸
    const getAvgRating = (item: ResultCardProps) =>
      Number.isFinite(item.avgRating) ? item.avgRating : 0;
    const getRatingCount = (item: ResultCardProps) =>
      Number.isFinite(item.ratingCount) ? item.ratingCount : 0;
    const getDistance = (item: ResultCardProps) =>
      Number.isFinite(item.distance as number) && (item.distance as number) > 0
        ? (item.distance as number)
        : Number.POSITIVE_INFINITY; // 가까운순에서 거리 없음은 가장 뒤로
    const getMinPrice = (item: ResultCardProps) => {
      try {
        if (from === 'package') {
          const price = Number(item.price);
          return Number.isFinite(price) ? price : Number.POSITIVE_INFINITY;
        } else {
          const priceList = Array.isArray(item.prices) ? (item.prices as any[]) : [];
          if (priceList.length === 0) return Number.POSITIVE_INFINITY;
          const candidates = priceList
            .map((obj: any) => Number(obj?.price))
            .filter((v) => Number.isFinite(v));
          if (candidates.length === 0) return Number.POSITIVE_INFINITY;
          return Math.min(...candidates);
        }
      } catch (_) {
        return Number.POSITIVE_INFINITY;
      }
    };

    if (from === 'sports') {
      if (selectedTab !== '전체') {
        result = result.filter(
          (item) => categoryMapEngToKor[item.category] === selectedTab
        );
      }
    }
    console.log(result);

    if (from === 'package') {
      if (selectedTab !== '전체') {
        result = result.filter(
          (item) => packageArrayMapEngToKor[item.category] === selectedTab
        );
      }
      console.log(result);
    }

    if (selectedOption === '추천순') {
      setFilteredSearchResult(result);
    } else if (selectedOption === '인기순') {
      result.sort((a, b) => getAvgRating(b) - getAvgRating(a));
    } else if (selectedOption === '가까운순') {
      result.sort((a, b) => getDistance(a) - getDistance(b));
    } else if (selectedOption === '고가순') {
      result.sort((a, b) => getMinPrice(b) - getMinPrice(a));
    } else if (selectedOption === '저가순') {
      result.sort((a, b) => getMinPrice(a) - getMinPrice(b));
    } else if (selectedOption === '리뷰많은순') {
      result.sort((a, b) => getRatingCount(b) - getRatingCount(a));
    }

    setFilteredSearchResult(result);
  }, [
    originalSearchResult,
    from,
    formatDayOfWeek,
    selectedTab,
    selectedOption,
  ]);

  useEffect(() => {
    filterAndSortResults();
  }, [filterAndSortResults]);

  useEffect(() => {
    setIsBottomSheetOpen(true);
  }, [selectedTab, setIsBottomSheetOpen]);

  useEffect(() => {
    return () => {
      setSearchInput({
        searchValue: '',
        searchDate: formatDate(new Date(), "yyyy-MM-dd'T'00:00:00"),
        searchTime: '11:00',
      });
    };
  }, [setSearchInput]);

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
