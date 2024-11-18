import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NoMeaningfulResultResponse } from 'types/response/response';

export const confirmReservation = async (
  reservationId: number
): Promise<NoMeaningfulResultResponse> => {
  return instance.post(`/api/v1/reservation/confirm/${reservationId}`);
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
