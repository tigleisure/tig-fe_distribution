import { useQuery } from '@tanstack/react-query';
import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';

export interface TBCReservationListResponse {
  result: ReservationItemProps[];
  resultCode: number;
  resultMsg: string;
}

export const getTBCReservationList =
  async (): Promise<TBCReservationListResponse> => {
    // TBC reservation list
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/reservation/tbc`
    );

    if (!response.ok) {
      throw new Error('Failed to get TBC reservation');
    }

    const data = await response.json();
    return data;
  };

export const useGetTBCReservationList = () => {
  return useQuery({
    queryKey: ['TBCReservation'],
    queryFn: getTBCReservationList,
  });
};
