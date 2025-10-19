import { Package } from 'types/response/response';
import { useFilterOptionStore } from '@store/filterOptionStore';
import { useCallback, useEffect, useState } from 'react';
import usePackageLocation from './usePackageLocation';

export const usePackageCards = (isLogin: boolean) => {
  const { packageCards } = usePackageLocation(isLogin);
  const [renderingPackageCards, setRenderingPackageCards] =
    useState<Package[]>(packageCards);
  const selectedOption = useFilterOptionStore((state) => state.filterOption);

  const filtering = useCallback(() => {
    let sortedCards = [...packageCards];
    if (selectedOption === '추천순') {
      // 추천순 로직 (기본 순서 유지)
    } else if (selectedOption === '인기순') {
      sortedCards.sort((a, b) => b.avgRating - a.avgRating);
    } else if (selectedOption === '가까운순') {
    } else if (selectedOption === '고가순') {
      sortedCards.sort(
        (a, b) =>
          Math.max(b.price) -
          Math.max(a.price)
      );
    } else if (selectedOption === '저가순') {
      sortedCards.sort(
        (a, b) =>
          Math.min(a.price) -
          Math.min(b.price)
      );
    } else if (selectedOption === '리뷰많은순') {
      sortedCards.sort((a, b) => b.ratingCount - a.ratingCount);
    }
    setRenderingPackageCards(sortedCards);
  }, [selectedOption, packageCards]);

  useEffect(() => {
    filtering();
  }, [selectedOption, packageCards]);

  return {
    renderingPackageCards,
  };
};
