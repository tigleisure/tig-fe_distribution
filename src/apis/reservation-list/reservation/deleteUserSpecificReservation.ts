import { useMutation } from '@tanstack/react-query';
import { error } from 'console';

export interface deleteUserSpecificReservationResponse {
  result: Record<string, never>; // {} 로 응답이 오므로, 빈 객체를 명시하는 방식
  resultCode: number;
  resultMsg: string;
}

export const deleteUserSpecificReservation = async (
  reservationId: number
): Promise<deleteUserSpecificReservationResponse> => {
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
