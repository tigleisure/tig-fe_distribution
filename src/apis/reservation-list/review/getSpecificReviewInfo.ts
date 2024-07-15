import { useQuery } from '@tanstack/react-query';
import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';

export interface reviewProps {
  reservationId: number;
  rating: number;
  contents: string;
}

export interface specifiReviewInfoResponse {
  result: {
    review: reviewProps;
    reservation: ReservationItemProps;
  };
  resultCode: number;
  resultMsg: string;
}

export const getSpecificReviewInfo = async (
  reviewId: number
): Promise<specifiReviewInfoResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/review/${reviewId}`,
    {
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch specific review information');
  }

  const data = await response.json();

  return data;
};

export const useGetSpecificReviewInfo = (reviewId: number) => {
  return useQuery({
    queryKey: ['specificReivewInfo', reviewId],
    queryFn: () => getSpecificReviewInfo(reviewId),
  });
};
