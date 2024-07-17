import { reviewInfoProps } from '@apis/reservation-list/review/getSpecificReviewInfo';
import { useMutation } from '@tanstack/react-query';
import { NoMeaningfulResultResponse } from 'types/response/response';
import { instance } from '@apis/instance';

export const postReview = async (
  postReviewData: reviewInfoProps
): Promise<NoMeaningfulResultResponse> => {
  return instance.post(
    `/api/v1/review/${postReviewData.reservationId}`,
    postReviewData
  );
};

export const usePostReview = () => {
  return useMutation({
    mutationFn: postReview,
  });
};
