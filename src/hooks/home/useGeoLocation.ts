import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useCallback, useMemo } from 'react';
import useTab from '@store/tabNumberStore';
import { categoryMapKorToEng } from '@constant/constant';
import { getHomeForUnlogin } from '@apis/home/getHomeForUnlogin';
import { getHomeForLogin } from '@apis/home/getHomeForLogin';

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: 37.5665,
    longitude: 126.978,
  });
  const selectedTab = useTab((state) => state.selectedTab);
  const {
    data: homeData,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['homeData', location.latitude, location.longitude],
    queryFn: async () => {
      const api = localStorage.getItem('accessToken')
        ? getHomeForLogin
        : getHomeForUnlogin;
      return api(location);
    },
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  const { originalClubCards, nearestClubsByCategory, recommendClubCards } =
    useMemo(() => {
      if (!homeData)
        return {
          originalClubCards: [],
          nearestClubsByCategory: {},
          recommendClubCards: [],
        };
      const result = homeData.result[0];
      return {
        originalClubCards: result.nearestClubs,
        nearestClubsByCategory: result.nearestClubsByCategory,
        recommendClubCards: result.recommendedClubs,
      };
    }, [homeData]);

  const clubCards = useMemo(() => {
    if (['홈', '문화', '스포츠'].includes(selectedTab)) {
      return originalClubCards;
    } else {
      return nearestClubsByCategory[categoryMapKorToEng[selectedTab]] || [];
    }
  }, [selectedTab, originalClubCards, nearestClubsByCategory]);

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
  }, []);

  const handleError = useCallback(() => {
    // If error occurs, use default Sinchon coordinates
    setLocation({ latitude: 37.5665, longitude: 126.978 });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      timeout: 5000,
    });
  }, [handleSuccess, handleError]);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      refetch();
    }
  }, [location, refetch]);

  return {
    clubCards,
    recommendClubCards,
    isSuccess,
  };
};

export default useGeolocation;
