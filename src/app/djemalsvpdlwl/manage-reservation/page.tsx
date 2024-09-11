'use client';
import { useGetTBCReservationList } from '@apis/djemalsvpdlwl/getTBCReservation';
import HistoryInAdminItem from '@components/djemalsvpdlwl/HistoryAdminItem';

export default function Page() {
  const { data, isSuccess } = useGetTBCReservationList();
  return (
    <main className="w-full h-full flex flex-col py-[20px] items-center overflow-y-scroll gap-[10px]">
      {isSuccess &&
        data.result.map((reservationInfo) => (
          <HistoryInAdminItem
            key={reservationInfo.reservationId}
            {...reservationInfo}
          />
        ))}
    </main>
  );
}
