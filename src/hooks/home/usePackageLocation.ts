'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getPackageForUnlogin } from '@apis/home/getPackageForUnlogin';
import { getPackageForLogin } from '@apis/home/getPackageForLogin';
import { useLocation } from '@hooks/useLocation';
import useTab from '@store/tabNumberStore';
import { packageArrayMapKorToEng } from '@constant/constant';
import { Package } from 'types/response/response';

export interface PackageData {
  popularPackages: Package[];
  recommendedPackages: Package[];
  randomPackages: Package[];
  nearestPackagesByCategory: Record<string, Package[]>;
}

export const usePackageLocation = (isLogin: boolean) => {
  const { location } = useLocation();
  const selectedTab = useTab((state) => state.selectedTab);

  const { data: packageData } = useSuspenseQuery({
    queryKey: ['packageData', location.latitude, location.longitude],
    queryFn: async () => {
      const api = isLogin ? getPackageForLogin : getPackageForUnlogin;
      return api(location);
    },
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  const {
    originalPackageCards,
    randomPackagesByCategory,
    recommendPackageCards,
  } = useMemo(() => {
    if (!packageData?.result?.[0])
      return {
        originalPackageCards: [],
        randomPackagesByCategory: {},
        recommendPackageCards: [],
      };

    const result = packageData.result[0];
    return {
      originalPackageCards: result.randomPackages ?? [],
      randomPackagesByCategory: result.randomPackagesByCategory ?? {},
      recommendPackageCards: result.recommendedPackages ?? [],
    };
  }, [packageData]);

  const packageCards = useMemo(() => {
    const packageTabs = [
      '골프장',
      '펜션',
      '버스',
      '출장뷔페',
      '도시락',
      '단체복',
    ];
    if (packageTabs.includes(selectedTab)) {
      const engKey = packageArrayMapKorToEng[selectedTab];
      return randomPackagesByCategory[engKey] ?? [];
    }
    return originalPackageCards;
  }, [originalPackageCards, randomPackagesByCategory, selectedTab]);

  return {
    packageCards,
    recommendPackageCards,
  };
};

export default usePackageLocation;
