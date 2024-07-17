import { useQuery } from '@tanstack/react-query';
import { reviewInfoProps } from '@apis/reservation-list/review/getSpecificReviewInfo';
import { instance } from '@apis/instance';

export interface getAllClubReviewResponse {
  result: reviewInfoProps[];
  resultCode: number;
  resultMsg: string;
}

export const getAllClubReview = async (
  clubId: number
): Promise<getAllClubReviewResponse> => {
  return instance.get(`/api/v1/review/club/${clubId}`);
};

export const useGetAllClubReview = (clubId: number) => {
  return useQuery({
    queryKey: ['clubReview', clubId],
    queryFn: () => getAllClubReview(clubId),
  });
};
