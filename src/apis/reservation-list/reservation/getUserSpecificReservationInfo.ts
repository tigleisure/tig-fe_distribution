import { useQuery } from '@tanstack/react-query';
import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';
import { instance } from '@apis/instance';
import { noDataServerErrorResponse } from 'types/response/response';

export interface userSpecificReservationInfoResponse {
  result: ReservationItemProps;
  resultCode: number;
  resultMsg: string;
}

export const getUserSpecificReservationInfo = async (
  reservationId: number
): Promise<userSpecificReservationInfoResponse> => {
  return instance.get(`/api/v1/reservation/${reservationId}`);
};

export const useGetUserSpecificReservationInfo = (reservationId: number) => {
  return useQuery({
    queryKey: ['userSpecificReservationInfo', reservationId],
    queryFn: () => getUserSpecificReservationInfo(reservationId),
  });
};
