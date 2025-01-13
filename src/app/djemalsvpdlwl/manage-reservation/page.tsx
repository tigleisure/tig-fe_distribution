'use client';
import { useGetTBCReservationList } from '@apis/djemalsvpdlwl/getTBCReservation';
import HistoryInAdminItem from '@components/djemalsvpdlwl/HistoryAdminItem';
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"

export default function Page() {
  const { data, isSuccess } = useGetTBCReservationList();
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="max-w-[480px] w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">내 예약 관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isSuccess && data.result.length === 0 ? (
              <div className="text-grey7 text-center py-8">예약 내역이 없습니다.</div>
            ) : (
              <div className="space-y-4">
                {isSuccess &&
                  data.result.map((reservationInfo) => (
                    <HistoryInAdminItem
                      key={reservationInfo.reservationId}
                      {...reservationInfo}
                    />
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
