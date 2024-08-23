import { useQuery } from '@tanstack/react-query';
import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';
import { instance } from '@apis/instance';

export interface eachReviewInfoProps {
  reservationId: number;
  rating: number;
  contents: string;
  userName: string;
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
  startTime: string;
}

export interface reviewInfoProps {
  reviews: eachReviewInfoProps[];
  reviewSummary: string;
}

export interface specifiReviewInfoResponse {
  result: {
    review: reviewInfoProps;
    reservation: ReservationItemProps;
  };
  resultCode: number;
  resultMsg: string;
}

export const getSpecificReviewInfo = async (
  reviewId: number
): Promise<specifiReviewInfoResponse> => {
  return instance.get(`/api/v1/review/${reviewId}`);
};

export const useGetSpecificReviewInfo = (reviewId: number) => {
  return useQuery({
    queryKey: ['specificReivewInfo', reviewId],
    queryFn: () => getSpecificReviewInfo(reviewId),
  });
};
