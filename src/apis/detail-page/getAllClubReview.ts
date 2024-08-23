import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { reviewInfoProps } from '@apis/reservation-list/review/getSpecificReviewInfo';
import { instance } from '@apis/instance';

export interface getAllClubReviewResponse {
  result: reviewInfoProps;
  resultCode: number;
  resultMsg: string;
}

export const getAllClubReview = async (
  clubId: string
): Promise<getAllClubReviewResponse> => {
  return instance.get(`/api/v1/review/club/${clubId}`);
};

export const useGetAllClubReview = (clubId: string) => {
  return useSuspenseQuery({
    queryKey: ['clubReview', clubId],
    queryFn: () => getAllClubReview(clubId),
  });
};
