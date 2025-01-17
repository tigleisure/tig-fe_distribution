'use client';

import { useState, useEffect } from 'react';
import HistoryHead from '@components/reservation-list/HistoryHead';
import HistoryInProgressItem from '@components/reservation-list/HistoryInProgressItem';
import HistoryEndItem from '@components/reservation-list/HistoryEndItem';
import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';
import NoneResultUI from '@components/all/NoneResultUI/NoneResultUI';
import Modal from '@components/all/Modal';
import useModal from '@store/modalStore';
import { useRouter } from 'next/navigation';
import cancelPortOnePayment from '@apis/portone/cancelPayment';
import { useDeleteUserSpecificReservation } from '@apis/reservation-list/reservation/deleteUserSpecificReservation';
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import handleSendTigCancelFailToDiscord from '@apis/discord/sendBackendCancelFailMessageToDiscord';

export default function ReservationListPage({
  reservationList,
}: {
  reservationList: ReservationItemProps[];
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // const { data } = useGetReservationList();
  // console.log(data);
  // const reservationList = data.result;
  const cancelReservationMutation = useDeleteUserSpecificReservation();

  const [historyHeadState, setHistoryHeadState] = useState<
    '전체' | '진행중' | '종료된'
  >('전체');
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

  const handleSecondButtonClick = async () => {
    const reservation = reservationList.find(
      (r) => r.reservationId === cancelReservationId
    );
    if ((reservation?.price || 0) > 0) {
      const cancelPortOneResponse = await cancelPortOnePayment(
        cancelPaymentId as string,
        '고객에 의한 예약 취소입니다'
      );

      if (cancelPortOneResponse.status !== 'SUCCEEDED') {
        alert(
          '결제 취소 요청이 실패했습니다! TIG 팀에 문의주시면 감사하겠습니다'
        );
        return;
      }
    }

    cancelReservationMutation.mutate(
      {
        reservationId: cancelReservationId as number,
        couponId:
          reservationList.find(
            (res) => res.reservationId === cancelReservationId
          )?.couponId || -1,
      },
      {
        onSuccess(data) {
          queryClient.invalidateQueries({
            queryKey: ['userReservationList'],
          });

          if (data.resultCode === 200) {
            router.replace('/');
          } else {
            handleSendTigCancelFailToDiscord(
              cancelReservationId as number,
              cancelPaymentId as string
            );
          }
        },
      }
    );
  };

  useEffect(() => {
    return () => {
      setSelectedIsModalOpen(false);
    };
  }, [setSelectedIsModalOpen]);

  return (
    <div className="w-full h-full flex flex-col shadow-mainShadow">
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
                {...reservationItem}
                key={index}
                handleChangeCancelPaymentId={setCancelPaymentId}
                handleChangeCancelReservationId={setCancelReservationId}
              />
            ) : (
              <HistoryEndItem key={index} {...reservationItem} />
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
            {inProgressReservationList.map((reservationItem, index) => (
              <HistoryInProgressItem
                key={index}
                {...reservationItem}
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
          {endReservationList.map((reservationItem, index) => (
            <HistoryEndItem key={index} {...reservationItem} />
          ))}
        </main>
      )}
      <Modal
        size="lg"
        button1Content="이전으로"
        button2Content="취소하기"
        title="예약을 취소하시겠습니까?"
        subTitle="예약 취소 시 수수료가 발생할 수 있습니다"
        secondButtonFunc={handleSecondButtonClick}
      />
    </div>
  );
}
