import { categoryMapEngToKor } from '@constant/constant';
import useTab from '@store/tabNumberStore';
import { MutateOptions } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PostHomePayload } from 'types/payload/payload';
import { Club, PostHomeResponse } from 'types/response/response';

export const useGeolocation = (
  mutate: (
    variables: PostHomePayload,
    options?:
      | MutateOptions<PostHomeResponse, Error, PostHomePayload, unknown>
      | undefined
  ) => void
) => {
  const [originalClubCards, setOriginalClubCards] = useState<Club[]>([]);
  const [clubCards, setClubCards] = useState<Club[]>([]);
  const [recommendClubCards, setRecommendClubCards] = useState<Club[]>([]);
  // 이벤트용 클럽 카드
  // const [originalEventClubCards, setOriginalEventClubCards] = useState<
  //   Club[]
  // >([]);
  const selectedTab = useTab((state) => state.selectedTab);

  useEffect(() => {
    if (selectedTab === '홈') {
      setClubCards(originalClubCards);
    } else {
      const filteredClubCards = originalClubCards.filter(
        (card) => categoryMapEngToKor[card.category] === selectedTab
      );
      setClubCards(filteredClubCards);
    }
  }, [selectedTab, originalClubCards]);

  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      fetchData(latitude, longitude);
    };

    const handleError = () => {
      // 에러 발생하면 신촌 좌표 전송
      fetchData(37.5665, 126.978);
    };

    const fetchData = (latitude: number, longitude: number) => {
      mutate(
        { latitude, longitude },
        {
          onSuccess: (data) => {
            console.log(data);
            setOriginalClubCards(data.result[0].nearestClubs);
            setClubCards(data.result[0].nearestClubs);
            setRecommendClubCards(data.result[0].recommendedClubs);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      timeout: 5000,
    });
  }, [mutate]);

  return {
    clubCards,
    recommendClubCards,
  };
};

export default useGeolocation;
