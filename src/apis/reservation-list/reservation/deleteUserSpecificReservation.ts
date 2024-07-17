import { useMutation } from '@tanstack/react-query';
import { NoMeaningfulResultResponse } from 'types/response/response';
import { error } from 'console';

export const deleteUserSpecificReservation = async (
  reservationId: number
): Promise<NoMeaningfulResultResponse> => {
  // api 엔드포인트는 추후 restful하게 수정 예정임
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/vi/reservation/cancel/${reservationId}`,
    {
      method: 'POST',
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to cancel ${reservationId} reservation!`);
  }

  const data = await response.json();
  return data;
};

export const useDeleteUserSpecificReservation = (reservationId: number) => {
  return useMutation({
    mutationFn: () => deleteUserSpecificReservation(reservationId),
  });
};
