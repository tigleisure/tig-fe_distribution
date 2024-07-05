'use client';
import { useState } from 'react';
import NavBar from '@components/all/NavBar/NavBar';
import HistoryHead from '@components/reservation-list/HistoryHead';
import HistoryInProgressItem from '@components/reservation-list/HistoryInProgressItem';
import HistoryEndItem from '@components/reservation-list/HistoryEndItem';
import {
  HistoryInProgressItemProps,
  HistoryEndItemProps,
} from 'types/reservation-list/ReservationListPageTypes';
import NoneResultUI from '@components/all/NoneResultUI/NoneResultUI';

const MockReservationInProgressDataArray: HistoryInProgressItemProps[] = [
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

const MockReservationEndDataArray: HistoryEndItemProps[] = [
  {
    companyName: '스카이락볼링장',
    companyAddress: '서울 서대문구 신촌로 73',
    eventDate: '05.10 (수)',
    eventStartTime: '오전 10:00',
    eventEndTime: '오전 11:00',
    adultCount: 8,
    isReviewed: false,
  },
  {
    companyName: '스카이락볼링장',
    companyAddress: '서울 서대문구 신촌로 73',
    eventDate: '05.05 (일)',
    eventStartTime: '오전 10:00',
    eventEndTime: '오전 11:00',
    adultCount: 8,
    isReviewed: true,
  },
];
export default function Page() {
  const [historyHeadState, setHistoryHeadState] = useState<
    '전체' | '진행중' | '종료된'
  >('전체');
  return (
    <div className="h-full pb-[54px] overflow-y-scroll">
      <HistoryHead
        totalCount={5}
        inProgressCount={3}
        completedCount={2}
        historyHeadState={historyHeadState}
        handleHeadState={setHistoryHeadState}
      />
      {historyHeadState === '전체' && (
        <main className="w-full h-full mt-2 flex flex-col justify-start items-center gap-y-[10px] overflow-y-scroll">
          <NoneResultUI
            message="예약 내역이 없어요"
            subMessage="마음에 드는 장소를 찾아 예약해보세요!"
          />
        </main>
      )}
      {historyHeadState === '진행중' && (
        <main className="w-full h-full flex flex-col justify-start items-center gap-y-[10px] overflow-y-scroll">
          {MockReservationInProgressDataArray.map((data, index) => (
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
      )}

      {historyHeadState === '종료된' && (
        <main className="w-full h-full flex flex-col justify-start items-center gap-y-[10px] overflow-y-scroll">
          {MockReservationEndDataArray.map((data, index) => (
            <HistoryEndItem
              key={index}
              companyName={data.companyName}
              companyAddress={data.companyAddress}
              eventDate={data.eventDate}
              eventStartTime={data.eventStartTime}
              eventEndTime={data.eventEndTime}
              adultCount={data.adultCount}
              isReviewed={data.isReviewed}
            />
          ))}
        </main>
      )}

      <NavBar />
    </div>
  );
}
