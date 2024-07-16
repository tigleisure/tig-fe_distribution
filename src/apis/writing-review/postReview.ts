import { reviewInfoProps } from '@apis/reservation-list/review/getSpecificReviewInfo';
import { useMutation } from '@tanstack/react-query';

export interface postReviewResponse {
  result: Record<string, never>;
  resultCode: number;
  resultMsg: string;
}

export const postReview = async (
  reservationId: number,
  rating: number,
  contents: string
): Promise<postReviewResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/vi/review/${reservationId}`,
    {
      credentials: 'include',
      body: JSON.stringify({
        reservationId,
        rating,
        contents,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to post review to reservation ${reservationId}`);
  }

  const data = await response.json();

  return data;
};

export const usePostReview = (
  reservationId: number,
  rating: number,
  contents: string
) => {
  return useMutation({
    mutationFn: () => postReview(reservationId, rating, contents),
  });
};
