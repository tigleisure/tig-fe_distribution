import { useQuery } from '@tanstack/react-query';
import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';
import { instance } from '@apis/instance';

export interface reviewInfoProps {
  reservationId: number;
  rating: number;
  contents: string;
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
