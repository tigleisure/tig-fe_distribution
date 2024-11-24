import { useMutation } from '@tanstack/react-query';
import { NoMeaningfulResultResponse } from 'types/response/response';
import { instance } from '@apis/instance';

export const deleteUserSpecificReservation = async ({
  reservationId,
  couponId,
}: {
  reservationId: number;
  couponId: number;
}): Promise<NoMeaningfulResultResponse> => {
  if (couponId !== -1) {
    return instance.post(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/reservation/cancel/${reservationId}?couponId=${couponId}`
    );
  }
  return instance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/reservation/cancel/${reservationId}`
  );
};

export const useDeleteUserSpecificReservation = () => {
  return useMutation({
    mutationFn: deleteUserSpecificReservation,
  });
};
