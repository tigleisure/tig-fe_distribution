import { cookies } from 'next/headers';
import ReservationListPage from './ReservationListPage';
import NonLoginReservationList from '@components/reservation-list/NonLoginReservationList';

export default function Page() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken');
  console.log('refreshToken in reservation list', refreshToken);

  if (!refreshToken) {
    return <NonLoginReservationList />;
  }

  return <ReservationListPage />;
}
