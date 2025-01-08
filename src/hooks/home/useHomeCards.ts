import { Club } from 'types/response/response';
import { useFilterOptionStore } from '@store/filterOptionStore';
import { useCallback, useEffect, useState } from 'react';
import useGeolocation from './useGeoLocation';

export const useHomeCards = () => {
  const { clubCards, isSuccess } = useGeolocation();
  const [renderingClubCards, setRenderingClubCards] = useState<Club[]>(clubCards);
  const selectedOption = useFilterOptionStore((state) => state.filterOption);

  const filtering = useCallback(() => {
    let sortedCards = [...clubCards];
    if (selectedOption === '추천순') {
      // 추천순 로직 (기본 순서 유지)
    } else if (selectedOption === '인기순') {
      sortedCards.sort((a, b) => b.avgRating - a.avgRating);
    } else if (selectedOption === '가까운순') {
    } else if (selectedOption === '고가순') {
      sortedCards.sort(
        (a, b) =>
          Math.max(...(b.prices as any[]).map((obj) => obj.price)) -
          Math.max(...(a.prices as any[]).map((obj) => obj.price))
      );
    } else if (selectedOption === '저가순') {
      sortedCards.sort(
        (a, b) =>
          Math.min(...(a.prices as any[]).map((obj) => obj.price)) -
          Math.min(...(b.prices as any[]).map((obj) => obj.price))
      );
    } else if (selectedOption === '리뷰많은순') {
      sortedCards.sort((a, b) => b.ratingCount - a.ratingCount);
    }
    setRenderingClubCards(sortedCards);
  }, [selectedOption, clubCards]);

  useEffect(() => {
    filtering();
  }, [selectedOption, clubCards]);

  return {
    renderingClubCards,
    isSuccess
  };
};
