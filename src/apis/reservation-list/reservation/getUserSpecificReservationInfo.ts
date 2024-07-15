import { useQuery } from '@tanstack/react-query';
import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';

export interface userSpecificReservationInfoResponse {
  result: ReservationItemProps;
  resultCode: number;
  resultMsg: string;
}

export const getUserSpecificReservationInfo = async (
  reservationId: number
): Promise<userSpecificReservationInfoResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/reservation/${reservationId}`,
    {
      credentials: 'include',
    }
  );

  if (!response.ok) {
    // 추후에 네트워크 오류로 못 가져온 것인지, 인가되지 않은 사용자의 접근인지를 구분해주어야 한다
    throw new Error("Failed to fetch user's specific reservation information");
  }

  const data = await response.json();

  return data;
};

export const useGetUserSpecificReservationInfo = (reservationId: number) => {
  return useQuery({
    queryKey: ['userSpecificReservationInfo', reservationId],
    queryFn: () => getUserSpecificReservationInfo(reservationId),
  });
};
