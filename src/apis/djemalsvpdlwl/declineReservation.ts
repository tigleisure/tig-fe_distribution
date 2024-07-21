import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NoMeaningfulResultResponse } from 'types/response/response';

export const declineReservation = async (
  reservationId: number
): Promise<NoMeaningfulResultResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/vi/reservation/decline/${reservationId}`,
    {
      method: 'POST',
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to decline ${reservationId} reservation!`);
  }

  const data = await response.json();
  return data;
};

export const useDeclineReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: declineReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TBCReservation'] });
    },
  });
};
