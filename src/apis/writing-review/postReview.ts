import { reviewInfoProps } from '@apis/reservation-list/review/getSpecificReviewInfo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userReservationList'] });
    },
  });
};
