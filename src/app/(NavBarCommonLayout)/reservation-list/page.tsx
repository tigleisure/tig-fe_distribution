'use client';
import { useState, useEffect } from 'react';
import NavBar from '@components/all/NavBar/NavBar';
import HistoryHead from '@components/reservation-list/HistoryHead';
import HistoryInProgressItem from '@components/reservation-list/HistoryInProgressItem';
import HistoryEndItem from '@components/reservation-list/HistoryEndItem';
import {
  HistoryInProgressItemProps,
  HistoryEndItemProps,
  ReservationItemProps,
} from 'types/reservation-list/ReservationListPageTypes';
import NoneResultUI from '@components/all/NoneResultUI/NoneResultUI';
import NoneArrowHeader from '@components/all/NoneArrowHeader';
import Modal from '@components/all/Modal';
import useModal from '@store/modalStore';

// const MockReservationInProgressDataArray: HistoryInProgressItemProps[] = [
//   {
//     companyName:
//       '스카이락볼링장 asfdasdfsdafdasfasdfasdfasdfsadfasdfsdafasdfsdafsadfdasfasdfasdfsdafdsafasdfasdf',
//     companyAddress:
//       '서울 서대문구 신촌로 73 asdfasdfsdafdsafsdafsadfasdfdsafdasfasdfsdafsdfasdfasdfsdafsdafsdafasdfsdfasdfasdfsd',
//     eventDate: '05.17 (금)',
//     eventStartTime: '오전 10:00',
//     eventEndTime: '오전 11:00',
//     adultCount: 2,
//     reservationStatus: 'inProgress',
//     reservationId: 1,
//   },
//   {
//     companyName: '스카이락볼링장',
//     companyAddress: '서울 서대문구 신촌로 73',
//     eventDate: '05.28 (화)',
//     eventStartTime: '오전 10:00',
//     eventEndTime: '오전 11:00',
//     adultCount: 8,
//     reservationStatus: 'inProgress',
//     reservationId: 2,
//   },
//   {
//     companyName: '스카이락볼링장',
//     companyAddress: '서울 서대문구 신촌로 73',
//     eventDate: '05.10 (수)',
//     eventStartTime: '오전 10:00',
//     eventEndTime: '오전 11:00',
//     adultCount: 8,
//     reservationStatus: 'confirmed',
//     reservationId: 3,
//   },
//   {
//     companyName: '스카이락볼링장',
//     companyAddress: '서울 서대문구 신촌로 73',
//     eventDate: '05.05 (일)',
//     eventStartTime: '오전 10:00',
//     eventEndTime: '오전 11:00',
//     adultCount: 8,
//     reservationStatus: 'confirmed',
//     reservationId: 4,
//   },
//   {
//     companyName: '스카이락볼링장',
//     companyAddress: '서울 서대문구 신촌로 73',
//     eventDate: '05.05 (일)',
//     eventStartTime: '오전 10:00',
//     eventEndTime: '오전 11:00',
//     adultCount: 8,
//     reservationStatus: 'inProgress',
//     reservationId: 5,
//   },
// ];

// const MockReservationEndDataArray: HistoryEndItemProps[] = [
//   {
//     companyName: '스카이락볼링장',
//     companyAddress: '서울 서대문구 신촌로 73',
//     eventDate: '05.10 (수)',
//     eventStartTime: '오전 10:00',
//     eventEndTime: '오전 11:00',
//     adultCount: 8,
//     closedReservationStatus: 'alreadyReviewed',
//     reservationId: 1,
//     reviewId: 1,
//   },
//   {
//     companyName: '스카이락볼링장',
//     companyAddress: '서울 서대문구 신촌로 73',
//     eventDate: '05.05 (일)',
//     eventStartTime: '오전 10:00',
//     eventEndTime: '오전 11:00',
//     adultCount: 8,
//     closedReservationStatus: 'notYetReviewed',
//     reservationId: 2,
//   },
//   {
//     companyName: '스카이락볼링장',
//     companyAddress: '서울 서대문구 신촌로 73',
//     eventDate: '05.05 (일)',
//     eventStartTime: '오전 10:00',
//     eventEndTime: '오전 11:00',
//     adultCount: 8,
//     closedReservationStatus: 'denied',
//     reservationId: 3,
//   },
//   {
//     companyName: '스카이락볼링장',
//     companyAddress: '서울 서대문구 신촌로 73',
//     eventDate: '05.05 (일)',
//     eventStartTime: '오전 10:00',
//     eventEndTime: '오전 11:00',
//     adultCount: 8,
//     closedReservationStatus: 'canceled',
//     reservationId: 4,
//   },
//   {
//     companyName: '스카이락볼링장',
//     companyAddress: '서울 서대문구 신촌로 73',
//     eventDate: '05.10 (수)',
//     eventStartTime: '오전 10:00',
//     eventEndTime: '오전 11:00',
//     adultCount: 8,
//     closedReservationStatus: 'denied',
//     reservationId: 5,
//   },
//   {
//     companyName: '스카이락볼링장',
//     companyAddress: '서울 서대문구 신촌로 73',
//     eventDate: '05.05 (일)',
//     eventStartTime: '오전 10:00',
//     eventEndTime: '오전 11:00',
//     adultCount: 8,
//     closedReservationStatus: 'notYetReviewed',
//     reservationId: 6,
//   },
// ];

export default function Page() {
  const [historyHeadState, setHistoryHeadState] = useState<
    '전체' | '진행중' | '종료된'
  >('전체');
  const [reservationList, setReservationList] = useState<
    ReservationItemProps[]
  >([]);

  const inProgressReservationList = reservationList.filter(
    (reservationItem) =>
      reservationItem.status === 'CONFIRMED' || reservationItem.status === 'TBC'
  );

  const endReservationList = reservationList.filter(
    (reservationItem) =>
      reservationItem.status !== 'CONFIRMED' && reservationItem.status !== 'TBC'
  );

  const setSelectedIsModalOpen = useModal(
    (state) => state.setSelectedIsModalOpen
  );

  useEffect(() => {
    return () => {
      setSelectedIsModalOpen(false);
    };
  }, []);

  useEffect(() => {
    async function getReservationList() {
      try {
        const response = await fetch(
          'https://api.tigleisure.com/api/v1/reservation',
          {
            credentials: 'include',
          }
        );

        const data = await response.json();

        console.log(data);

        setReservationList(data);
      } catch (error) {
        console.log(error);
      }
    }

    getReservationList();
  }, []);

  return (
    <div className="flex flex-col h-full pb-[54px] items-center">
      <NoneArrowHeader title="예약내역" />
      <HistoryHead
        totalCount={reservationList.length}
        inProgressCount={inProgressReservationList.length}
        completedCount={endReservationList.length}
        historyHeadState={historyHeadState}
        handleHeadState={setHistoryHeadState}
      />
      {historyHeadState === '전체' && reservationList.length === 0 && (
        <main className="w-full h-full flex flex-col top-[117px] justify-center items-center gap-y-[10px] overflow-y-scroll">
          <NoneResultUI
            message="예약 내역이 없어요"
            subMessage="마음에 드는 장소를 찾아 예약해보세요!"
          />
        </main>
      )}

      {historyHeadState === '전체' && reservationList.length !== 0 && (
        <main className="w-full max-h-reservationListMain pt-5 pb-10 flex flex-col top-[117px] absolute justify-start items-center gap-y-[10px] overflow-y-scroll">
          {reservationList.map((reservationItem, index) =>
            reservationItem.status === 'TBC' ||
            reservationItem.status === 'CONFIRMED' ? (
              <HistoryInProgressItem
                key={index}
                companyName={reservationItem.clubName}
                companyAddress={reservationItem.clubAddress}
                eventDate={reservationItem.date}
                eventStartTime={reservationItem.startTime}
                eventEndTime={reservationItem.endTime}
                adultCount={reservationItem.adultCount}
                reservationStatus={reservationItem.status}
                reservationId={index}
              />
            ) : (
              <HistoryEndItem
                key={index}
                companyName={reservationItem.clubName}
                companyAddress={reservationItem.clubAddress}
                eventDate={reservationItem.date}
                eventStartTime={reservationItem.startTime}
                eventEndTime={reservationItem.endTime}
                adultCount={reservationItem.adultCount}
                reservationStatus={reservationItem.status}
                reservationId={index} //일단 백엔드에서 추후에 예약과 review id를 줌
                reviewId={index}
              />
            )
          )}
        </main>
      )}

      {historyHeadState === '진행중' &&
        inProgressReservationList.length === 0 && (
          <main className="w-full h-full flex flex-col top-[117px] justify-center items-center gap-y-[10px] overflow-y-scroll">
            <NoneResultUI
              message="예약 내역이 없어요"
              subMessage="마음에 드는 장소를 찾아 예약해보세요!"
            />
          </main>
        )}

      {historyHeadState === '진행중' &&
        inProgressReservationList.length !== 0 && (
          <main className="w-full max-h-reservationListMain pt-5 pb-10 flex flex-col top-[117px] absolute justify-start items-center gap-y-[10px] overflow-y-scroll">
            {inProgressReservationList.map((data, index) => (
              <HistoryInProgressItem
                key={index}
                companyName={data.clubName}
                companyAddress={data.clubAddress}
                eventDate={data.date}
                eventStartTime={data.startTime}
                eventEndTime={data.endTime}
                adultCount={data.adultCount}
                reservationStatus={data.status}
                reservationId={index}
              />
            ))}
          </main>
        )}

      {historyHeadState === '종료된' && endReservationList.length === 0 && (
        <main className="w-full h-full flex flex-col top-[117px] justify-center items-center gap-y-[10px] overflow-y-scroll">
          <NoneResultUI
            message="예약 내역이 없어요"
            subMessage="마음에 드는 장소를 찾아 예약해보세요!"
          />
        </main>
      )}

      {historyHeadState === '종료된' && endReservationList.length !== 0 && (
        <main className="w-full max-h-reservationListMain pt-5 pb-10 flex flex-col top-[117px] absolute justify-start items-center gap-y-[10px] overflow-y-scroll">
          {endReservationList.map((data, index) => (
            <HistoryEndItem
              key={index}
              companyName={data.clubName}
              companyAddress={data.clubAddress}
              eventDate={data.date}
              eventStartTime={data.startTime}
              eventEndTime={data.endTime}
              adultCount={data.adultCount}
              reservationStatus={data.status}
              reservationId={index}
              reviewId={index}
            />
          ))}
        </main>
      )}
      <Modal
        size="lg"
        button1Content="이전으로"
        button2Content="취소하기"
        title="예약을 취소하시겠습니까?"
        subTitle="예약 취소 시 수수료가 발생할 수 있습니다"
      />
      {/* <NavBar /> */}
    </div>
  );
}
