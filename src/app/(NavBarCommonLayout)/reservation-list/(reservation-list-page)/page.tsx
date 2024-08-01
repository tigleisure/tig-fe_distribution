'use client';
import { useState, useEffect } from 'react';
import HistoryHead from '@components/reservation-list/HistoryHead';
import HistoryInProgressItem from '@components/reservation-list/HistoryInProgressItem';
import HistoryEndItem from '@components/reservation-list/HistoryEndItem';
import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';
import NoneResultUI from '@components/all/NoneResultUI/NoneResultUI';
import Modal from '@components/all/Modal';
import useModal from '@store/modalStore';
import { useGetReservationList } from '@apis/reservation-list/getUserReservationList';
import { useRouter } from 'next/navigation';
import cancelPortOnePayment from '@apis/portone/cancelPayment';
import { useDeleteUserSpecificReservation } from '@apis/reservation-list/reservation/deleteUserSpecificReservation';
import { useQueryClient } from '@tanstack/react-query';
import handleSendTigCancelFailToDiscord from '@apis/discord/sendBackendCancelFailMessageToDiscord';
import NonLoginReservationList from '@components/reservation-list/NonLoginReservationList';

export default function Page() {
  const [historyHeadState, setHistoryHeadState] = useState<
    '전체' | '진행중' | '종료된'
  >('전체');
  const [reservationList, setReservationList] = useState<
    ReservationItemProps[] | []
  >([]);

  const [cancelPaymentId, setCancelPaymentId] = useState<string | null>(null);
  const [cancelReservationId, setCancelReservationId] = useState<number | null>(
    null
  );

  const inProgressReservationList = reservationList
    ? reservationList.filter(
        (reservationItem) =>
          reservationItem.status === 'CONFIRMED' ||
          reservationItem.status === 'TBC'
      )
    : [];

  const endReservationList = reservationList
    ? reservationList.filter(
        (reservationItem) =>
          reservationItem.status !== 'CONFIRMED' &&
          reservationItem.status !== 'TBC'
      )
    : [];

  const setSelectedIsModalOpen = useModal(
    (state) => state.setSelectedIsModalOpen
  );

  const { data, isError } = useGetReservationList();

  const cancelReservationMutation = useDeleteUserSpecificReservation();

  const router = useRouter();

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      setSelectedIsModalOpen(false);
    };
  }, []);

  useEffect(() => {
    if (data) {
      // 데이터가 없는 경우에는 result 필드가 null로 오기 때문에 아래에서 문제가 생기는 상황이 발생함
      if (data.result === null) {
        setReservationList([]);
      } else {
        setReservationList(data.result);
      }
    }
    // data의 resultCode가 오류이면 여기에서도 setIsLoading(false)로 바꾸고 reservationList는 빈 것으로 유지

    // 네트워크 장애가 났을 경우는 일단 홈으로 사용자를 보낸다
    if (isError) {
      router.replace('/');
    }
  }, [data]);

  return (
    <>
      {localStorage.getItem('accessToken') ? (
        <>
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
                    gameCount={reservationItem.gameCount}
                    adultCount={reservationItem.adultCount}
                    teenagerCount={reservationItem.teenagerCount}
                    kidsCount={reservationItem.kidsCount}
                    reservationStatus={reservationItem.status}
                    reservationId={reservationItem.reservationId}
                    paymentId={reservationItem.paymentId}
                    handleChangeCancelPaymentId={setCancelPaymentId}
                    handleChangeCancelReservationId={setCancelReservationId}
                    imageUrls={reservationItem.imageUrls}
                  />
                ) : (
                  <HistoryEndItem
                    key={index}
                    clubName={reservationItem.clubName}
                    clubAddress={reservationItem.clubAddress}
                    eventDate={reservationItem.date}
                    eventStartTime={reservationItem.startTime}
                    eventEndTime={reservationItem.endTime}
                    gameCount={reservationItem.gameCount}
                    adultCount={reservationItem.adultCount}
                    teenagerCount={reservationItem.teenagerCount}
                    kidsCount={reservationItem.kidsCount}
                    reservationStatus={reservationItem.status}
                    reservationId={reservationItem.reservationId} //일단 백엔드에서 추후에 예약과 review id를 줌
                    reviewId={reservationItem.reviewId}
                    imageUrls={reservationItem.imageUrls}
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
                    gameCount={data.gameCount}
                    adultCount={data.adultCount}
                    teenagerCount={data.teenagerCount}
                    kidsCount={data.kidsCount}
                    reservationStatus={data.status}
                    reservationId={data.reservationId}
                    paymentId={data.paymentId}
                    handleChangeCancelPaymentId={setCancelPaymentId}
                    handleChangeCancelReservationId={setCancelReservationId}
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
                  gameCount={data.gameCount}
                  adultCount={data.adultCount}
                  teenagerCount={data.teenagerCount}
                  kidsCount={data.kidsCount}
                  reservationStatus={data.status}
                  reservationId={data.reservationId}
                  reviewId={data.reviewId}
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
            secondButtonFunc={async () => {
              const cancelPortOneResponse = await cancelPortOnePayment(
                cancelPaymentId as string,
                '고객에 의한 예약 취소입니다'
              );

              if (cancelPortOneResponse.status !== 'SUCCEEDED') {
                alert(
                  '결제 취소 요청이 실패했습니다! TIG 팀에 문의주시면 감사하겠습니다'
                );
              } else {
                cancelReservationMutation.mutate(
                  cancelReservationId as number,
                  {
                    onSuccess(data, variables, context) {
                      // 성공적인 tig 예약 취소가 이루어짐.
                      queryClient.invalidateQueries({
                        queryKey: ['userReservationList'],
                      });
                      if (data.resultCode === 200) {
                        router.replace('/');
                      } else {
                        // Discord로 기획 쪽에 알리는 로직
                        handleSendTigCancelFailToDiscord(
                          cancelReservationId as number,
                          cancelPaymentId as string
                        );
                      }
                    },
                  }
                );
              }
            }}
          />
        </>
      ) : (
        <NonLoginReservationList />
      )}
    </>
  );
}
