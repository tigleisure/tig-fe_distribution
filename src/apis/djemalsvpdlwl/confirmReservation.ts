import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NoMeaningfulResultResponse } from 'types/response/response';

export const confirmReservation = async (
  reservationId: number
): Promise<NoMeaningfulResultResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/vi/reservation/confirm/${reservationId}`,
    {
      method: 'POST',
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to confirm ${reservationId} reservation!`);
  }

  const data = await response.json();
  return data;
};

export const useConfirmReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TBCReservation'] });
    },
  });
};
