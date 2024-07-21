import { useGetTBCReservationList } from '@apis/djemalsvpdlwl/getTBCReservation';
import HistoryInProgressItem from '@components/djemalsvpdlwl/HistoryAdminItem';

export default function Page() {
  // const { data, isSuccess } = useGetTBCReservationList();
  return (
    <main className="w-full h-full flex flex-col pt-[54px] items-center">
      {/* {isSuccess &&
        data.result.map((reservationInfo) => (
          <HistoryInProgressItem
            key={reservationInfo.reservationId}
            clubName={reservationInfo.clubName}
            clubAddress={reservationInfo.clubAddress}
            eventDate={reservationInfo.date}
            eventStartTime={reservationInfo.startTime}
            eventEndTime={reservationInfo.endTime}
            adultCount={reservationInfo.adultCount}
            teenagerCount={reservationInfo.teenagerCount}
            kidsCount={reservationInfo.kidsCount}
            reservationStatus={reservationInfo.status}
            reservationId={reservationInfo.reservationId}
            paymentId={reservationInfo.paymentId}
          />
        ))} */}
    </main>
  );
}
