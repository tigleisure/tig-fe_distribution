export const revalidate = 0;
export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers';
import ReservationListPage from './ReservationListPage';
import NonLoginReservationList from '@components/reservation-list/NonLoginReservationList';
import { getUserResListFetch } from '@apis/reservation-list/getUserResListFetch';

export default async function Page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  // 현재 시간을 쿼리 파라미터로 추가하여 캐싱 방지
  const timestamp = new Date().getTime();

  if (!accessToken) {
    return <NonLoginReservationList />;
  }

  const data = await getUserResListFetch();
  const reservationList = data.result;
  return (
    <div className="w-full h-full flex flex-col">
      <ReservationListPage reservationList={reservationList} />
    </div>
  );
}
