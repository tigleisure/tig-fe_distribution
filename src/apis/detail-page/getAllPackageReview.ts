import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { instance } from '@apis/instance';

export interface packageReviewInfoProps {
  reviewId: number;
  packageReservationId: number;
  packageSetId: number;
  packageSetName: string;
  category:
    | 'GOLF'
    | 'CATERING'
    | 'LUNCH_BOX'
    | 'GROUP_UNIFORM'
    | 'PENSION'
    | 'BUS';
  rating: number;
  contents: string;
  userName: string;
  createdAt: string; // ISO datetime string
}

export interface reviewInfoProps {
  reviews: packageReviewInfoProps[];
  reviewSummary: string;
}

interface getAllPackageReviewResponse {
  result: reviewInfoProps;
  resultCode: number;
  resultMsg: string;
}

export const getAllPackageReview = async (
  clubId: string
): Promise<getAllPackageReviewResponse> => {
  return instance.get(`/api/v1/review/package-set/package/${clubId}`);
};

export const useGetAllPackageReview = (clubId: string) => {
  return useSuspenseQuery({
    queryKey: ['packageReview', clubId],
    queryFn: () => getAllPackageReview(clubId),
  });
};
