import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NoMeaningfulResultResponse } from 'types/response/response';

export const declineReservation = async (
  reservationId: number
): Promise<NoMeaningfulResultResponse> => {
  return instance.post(`/api/v1/reservation/decline/${reservationId}`);
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
