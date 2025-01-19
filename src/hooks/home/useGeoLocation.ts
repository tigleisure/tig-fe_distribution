'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import useTab from '@store/tabNumberStore';
import { categoryMapKorToEng } from '@constant/constant';
import { getHomeForUnlogin } from '@apis/home/getHomeForUnlogin';
import { getHomeForLogin } from '@apis/home/getHomeForLogin';
import { useLocation } from '@hooks/useLocation';
import { Club } from 'types/response/response';

export interface HomeData {
  nearestClubs: Club[];
  nearestClubsByCategory: Record<string, Club[]>;
  recommendedClubs: Club[];
}

// cookie를 까봐서 RT가 있는지 없는지 확인해서 요청을 결정하면 되지 않을까?
export const useGeolocation = (isLogin: boolean) => {
  const { location } = useLocation();
  const selectedTab = useTab((state) => state.selectedTab);

  const { data: homeData } = useSuspenseQuery({
    queryKey: ['homeData', location.latitude, location.longitude],
    queryFn: async () => {
      const api = isLogin ? getHomeForLogin : getHomeForUnlogin;
      return api(location);
    },
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  const { originalClubCards, nearestClubsByCategory, recommendClubCards } =
    useMemo(() => {
      if (!homeData?.result?.[0])
        return {
          originalClubCards: [],
          nearestClubsByCategory: {},
          recommendClubCards: [],
        };

      const result = homeData.result[0];
      return {
        originalClubCards: result.nearestClubs ?? [],
        nearestClubsByCategory: result.nearestClubsByCategory ?? {},
        recommendClubCards: result.recommendedClubs ?? [],
      };
    }, [homeData]);

  const clubCards = useMemo(() => {
    if (['홈', '문화', '스포츠'].includes(selectedTab)) {
      return originalClubCards;
    }
    return nearestClubsByCategory[categoryMapKorToEng[selectedTab]] ?? [];
  }, [selectedTab, originalClubCards, nearestClubsByCategory]);

  return {
    clubCards,
    recommendClubCards,
  };
};

export default useGeolocation;
