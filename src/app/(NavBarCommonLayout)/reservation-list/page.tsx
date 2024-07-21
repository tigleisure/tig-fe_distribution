'use client';
import { useState, useEffect } from 'react';
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
import { useGetReservationList } from '@apis/reservation-list/getUserReservationList';
import { usePostReservation } from '@apis/payment/before/postReservation';
import TigLoadingPage from '@components/all/TigLoadingPage';
import { useRouter } from 'next/navigation';
import cancelPortOnePayment from '@apis/portone/cancelPayment';

export default function Page() {
  const [historyHeadState, setHistoryHeadState] = useState<
    '전체' | '진행중' | '종료된'
  >('전체');
  const [reservationList, setReservationList] = useState<
    ReservationItemProps[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cancelPaymentId, setCancelPaymentId] = useState<string | null>(null);

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

  const { data, isError } = useGetReservationList();

  const router = useRouter();

  console.log(data);

  const mutation = usePostReservation();

  useEffect(() => {
    return () => {
      setSelectedIsModalOpen(false);
    };
  }, []);

  // useEffect(() => {
  //   mutation.mutate({
  //     adultCount: 3,
  //     teenagerCount: 2,
  //     kidsCount: 1,
  //     date: '2024-07-17T00:00:00',
  //     startTime: '2024-07-17T10:10:10',
  //     endTime: '2024-07-17T11:10:10',
  //     price: 20000,
  //     status: 'TBC',
  //     clubId: 3,
  //     paymentId: 'safajsdlfja',
  //   });
  // }, []);

  useEffect(() => {
    if (data) {
      setReservationList(data.result);
      setIsLoading(false);
    }
    // data의 resultCode가 오류이면 여기에서도 setIsLoading(false)로 바꾸고 reservationList는 빈 것으로 유지

    // 네트워크 장애가 났을 경우는 일단 홈으로 사용자를 보낸다
    if (isError) {
      router.replace('/');
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <TigLoadingPage />
      ) : (
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
                message="예약 내역이 없어요."
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
                    clubName={reservationItem.clubName}
                    clubAddress={reservationItem.clubAddress}
                    eventDate={reservationItem.date}
                    eventStartTime={reservationItem.startTime}
                    eventEndTime={reservationItem.endTime}
                    adultCount={reservationItem.adultCount}
                    teenagerCount={reservationItem.teenagerCount}
                    kidsCount={reservationItem.kidsCount}
                    reservationStatus={reservationItem.status}
                    reservationId={reservationItem.reservationId}
                    paymentId={cancelPaymentId}
                    handleChangeCancelPaymentId={setCancelPaymentId}
                  />
                ) : (
                  <HistoryEndItem
                    key={index}
                    clubName={reservationItem.clubName}
                    clubAddress={reservationItem.clubAddress}
                    eventDate={reservationItem.date}
                    eventStartTime={reservationItem.startTime}
                    eventEndTime={reservationItem.endTime}
                    adultCount={reservationItem.adultCount}
                    teenagerCount={reservationItem.teenagerCount}
                    kidsCount={reservationItem.kidsCount}
                    reservationStatus={reservationItem.status}
                    reservationId={reservationItem.reservationId} //일단 백엔드에서 추후에 예약과 review id를 줌
                    // reviewId={}
                  />
                )
              )}
            </main>
          )}

          {historyHeadState === '진행중' &&
            inProgressReservationList.length === 0 && (
              <main className="w-full h-full flex flex-col top-[117px] justify-center items-center gap-y-[10px] overflow-y-scroll">
                <NoneResultUI
                  message="예약 내역이 없어요."
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
                    clubName={data.clubName}
                    clubAddress={data.clubAddress}
                    eventDate={data.date}
                    eventStartTime={data.startTime}
                    eventEndTime={data.endTime}
                    adultCount={data.adultCount}
                    teenagerCount={data.teenagerCount}
                    kidsCount={data.kidsCount}
                    reservationStatus={data.status}
                    reservationId={index}
                    paymentId={cancelPaymentId}
                    handleChangeCancelPaymentId={setCancelPaymentId}
                  />
                ))}
              </main>
            )}

          {historyHeadState === '종료된' && endReservationList.length === 0 && (
            <main className="w-full h-full flex flex-col top-[117px] justify-center items-center gap-y-[10px] overflow-y-scroll">
              <NoneResultUI
                message="예약 내역이 없어요."
                subMessage="마음에 드는 장소를 찾아 예약해보세요!"
              />
            </main>
          )}

          {historyHeadState === '종료된' && endReservationList.length !== 0 && (
            <main className="w-full max-h-reservationListMain pt-5 pb-10 flex flex-col top-[117px] absolute justify-start items-center gap-y-[10px] overflow-y-scroll">
              {endReservationList.map((data, index) => (
                <HistoryEndItem
                  key={index}
                  clubName={data.clubName}
                  clubAddress={data.clubAddress}
                  eventDate={data.date}
                  eventStartTime={data.startTime}
                  eventEndTime={data.endTime}
                  adultCount={data.adultCount}
                  teenagerCount={data.teenagerCount}
                  kidsCount={data.kidsCount}
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
            secondButtonFunc={() =>
              cancelPortOnePayment(cancelPaymentId as string)
            }
          />
        </div>
      )}
    </>
  );
}
