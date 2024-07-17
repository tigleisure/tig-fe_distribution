import { useQuery } from '@tanstack/react-query';
import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';
import { instance } from '@apis/instance';

export interface userReservationListResponse {
  result: ReservationItemProps[];
  resultCode: number;
  resultMsg: string;
}

export const getUserReservationList =
  async (): Promise<userReservationListResponse> => {
    return instance.get('/api/v1/reservation/all');
  };

export const useGetReservationList = () => {
  return useQuery({
    queryKey: ['userReservationList'],
    queryFn: getUserReservationList,
  });
};
