import { cookies } from 'next/headers';
import { userReservationListResponse } from './getUserReservationList';

export const getUserResListFetch =
  async (): Promise<userReservationListResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/reservation/all`,
      {
        headers: {
          Cookie: cookies().toString(),
        },
      }
    );
    console.log(cookies().toString());
    return res.json();
  };
