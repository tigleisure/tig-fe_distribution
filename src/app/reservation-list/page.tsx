import NavBar from '@components/all/NavBar/NavBar';
import HistoryHead from '@components/reservation-list/HistoryHead';
import HistoryInProgressItem from '@components/reservation-list/HistoryInProgressItem';
import { HistoryInProgressItemProps } from 'types/reservation-list/ReservationListPageTypes';

const MockReservationDataArray: HistoryInProgressItemProps[] = [
  {
    companyName: '스카이락볼링장',
    companyAddress: '서울 서대문구 신촌로 73',
    eventDate: '05.17 (금)',
    eventStartTime: '오전 10:00',
    eventEndTime: '오전 11:00',
    adultCount: 2,
    reservationStatus: 'inProgress',
  },
  {
    companyName: '스카이락볼링장',
    companyAddress: '서울 서대문구 신촌로 73',
    eventDate: '05.28 (화)',
    eventStartTime: '오전 10:00',
    eventEndTime: '오전 11:00',
    adultCount: 8,
    reservationStatus: 'canceled',
  },
  {
    companyName: '스카이락볼링장',
    companyAddress: '서울 서대문구 신촌로 73',
    eventDate: '05.10 (수)',
    eventStartTime: '오전 10:00',
    eventEndTime: '오전 11:00',
    adultCount: 8,
    reservationStatus: 'confirmed',
  },
  {
    companyName: '스카이락볼링장',
    companyAddress: '서울 서대문구 신촌로 73',
    eventDate: '05.05 (일)',
    eventStartTime: '오전 10:00',
    eventEndTime: '오전 11:00',
    adultCount: 8,
    reservationStatus: 'denied',
  },
  {
    companyName: '스카이락볼링장',
    companyAddress: '서울 서대문구 신촌로 73',
    eventDate: '05.05 (일)',
    eventStartTime: '오전 10:00',
    eventEndTime: '오전 11:00',
    adultCount: 8,
    reservationStatus: 'denied',
  },
];

export default function page() {
  return (
    <div className="h-full pb-[54px] overflow-y-scroll">
      <HistoryHead totalCount={5} inProgressCount={3} completedCount={2} />
      <main className="w-full h-full flex flex-col justify-start items-center gap-y-[10px] overflow-y-scroll">
        {MockReservationDataArray.map((data, index) => (
          <HistoryInProgressItem
            key={index}
            companyName={data.companyName}
            companyAddress={data.companyAddress}
            eventDate={data.eventDate}
            eventStartTime={data.eventStartTime}
            eventEndTime={data.eventEndTime}
            adultCount={data.adultCount}
            reservationStatus={data.reservationStatus}
          />
        ))}
      </main>
      <NavBar />
    </div>
  );
}
