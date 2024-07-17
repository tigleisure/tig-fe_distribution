import { instance } from '@apis/instance';
import { useMutation } from '@tanstack/react-query';
import { NoMeaningfulResultResponse } from 'types/response/response';

export const cancelUserReservationFunc = (
  reservationId: number
): Promise<NoMeaningfulResultResponse> => {
  return instance.post(`/api/v1/reservation/cancel/${reservationId}`);
};

// 우선 예약 취소는 중요한 사안이라 낙관적 업데이트를 적용하지 않는 것으로
export const useCancelUserReservation = (reservationId: number) => {
  return useMutation({
    mutationFn: () => cancelUserReservationFunc(reservationId),
  });
};
