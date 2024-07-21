import { useQuery } from '@tanstack/react-query';
import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';
import { instance } from '@apis/instance';

export interface TBCReservationListResponse {
  result: ReservationItemProps[];
  resultCode: number;
  resultMsg: string;
}

export const getTBCReservationList =
  async (): Promise<TBCReservationListResponse> => {
    // TBC reservation list
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/reservation/TBC`
    );

    if (!response.ok) {
      throw new Error('Failed to get TBC reservation');
    }

    const data = await response.json();
    return data;
  };

export const useGetTBCReservationList = () => {
  return useQuery({
    queryKey: ['TBCReservationList'],
    queryFn: getTBCReservationList,
  });
};
