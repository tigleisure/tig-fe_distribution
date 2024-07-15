import { useQuery } from '@tanstack/react-query';
import { reviewInfoProps } from '@apis/reservation-list/review/getSpecificReviewInfo';

export interface getAllClubReviewResponse {
  result: reviewInfoProps[];
  resultCode: number;
  resultMsg: string;
}

export const getAllClubReview = async (
  clubId: number
): Promise<getAllClubReviewResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/review/club/${clubId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch review data of club ${clubId}`);
  }

  const data = await response.json();
  return data;
};

export const useGetAllClubReview = (clubId: number) => {
  return useQuery({
    queryKey: ['clubReview', clubId],
    queryFn: () => getAllClubReview(clubId),
  });
};
