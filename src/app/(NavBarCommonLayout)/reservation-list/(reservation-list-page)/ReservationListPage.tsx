'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import HistoryHead from '@components/reservation-list/HistoryHead';
import HistoryInProgressItem from '@components/reservation-list/HistoryInProgressItem';
import HistoryEndItem from '@components/reservation-list/HistoryEndItem';
import NoneResultUI from '@components/all/NoneResultUI/NoneResultUI';
import Modal from '@components/all/Modal';
import HistoryInProgressItemSkeleton from '@components/reservation-list/HistoryInProgressItemSkeleton';

import useModal from '@store/modalStore';
import { useDeleteUserSpecificReservation } from '@apis/reservation-list/reservation/deleteUserSpecificReservation';
import cancelPortOnePayment from '@apis/portone/cancelPayment';
import handleSendTigCancelFailToDiscord from '@apis/discord/sendBackendCancelFailMessageToDiscord';

import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';
import CustomSuspense from '@providers/CustomSuspense';

type HistoryHeadState = '전체' | '진행중' | '종료된';

function ReservationList({
  reservationList,
  ...props
}: {
  reservationList: ReservationItemProps[];
  handleChangeCancelPaymentId: (id: string | null) => void;
  handleChangeCancelReservationId: (id: number | null) => void;
}) {
  const noReservationsUI = (
    <main className="w-full h-full flex flex-col top-[117px] justify-center items-center gap-y-[10px] overflow-y-scroll">
      <NoneResultUI
        message="예약 내역이 없어요."
        subMessage="마음에 드는 장소를 찾아 예약해보세요!"
      />
    </main>
  );

  if (reservationList.length === 0) return noReservationsUI;

  return (
    <main className="w-full max-h-reservationListMain pt-5 pb-10 flex flex-col top-[117px] absolute justify-start items-center gap-y-[10px] overflow-y-scroll">
      {reservationList.map((item, index) =>
        item.status === 'TBC' || item.status === 'CONFIRMED' ? (
          <HistoryInProgressItem
            key={index}
            {...item}
            handleChangeCancelPaymentId={props.handleChangeCancelPaymentId}
            handleChangeCancelReservationId={
              props.handleChangeCancelReservationId
            }
          />
        ) : (
          <HistoryEndItem key={index} {...item} />
        )
      )}
    </main>
  );
}

export default function ReservationListPage({
  reservationList,
}: {
  reservationList: ReservationItemProps[];
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const cancelReservationMutation = useDeleteUserSpecificReservation();
  const setSelectedIsModalOpen = useModal(
    (state) => state.setSelectedIsModalOpen
  );

  const [historyHeadState, setHistoryHeadState] =
    useState<HistoryHeadState>('전체');
  const [cancelPaymentId, setCancelPaymentId] = useState<string | null>(null);
  const [cancelReservationId, setCancelReservationId] = useState<number | null>(
    null
  );

  const filteredReservations = {
    inProgress: reservationList.filter(
      (item) => item.status === 'CONFIRMED' || item.status === 'TBC'
    ),
    ended: reservationList.filter(
      (item) => item.status !== 'CONFIRMED' && item.status !== 'TBC'
    ),
  };

  const handleCancelReservation = async () => {
    const reservation = reservationList.find(
      (r) => r.reservationId === cancelReservationId
    );

    if ((reservation?.price || 0) > 0) {
      const cancelResponse = await cancelPortOnePayment(
        cancelPaymentId as string,
        '고객에 의한 예약 취소입니다'
      );

      if (cancelResponse.status !== 'SUCCEEDED') {
        alert(
          '결제 취소 요청이 실패했습니다! TIG 팀에 문의주시면 감사하겠습니다'
        );
        return;
      }
    }

    const couponId = reservation?.couponId ?? -1;

    cancelReservationMutation.mutate(
      { reservationId: cancelReservationId as number, couponId },
      {
        onSuccess(data) {
          queryClient.invalidateQueries({ queryKey: ['userReservationList'] });

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
    return () => setSelectedIsModalOpen(false);
  }, [setSelectedIsModalOpen]);

  const getReservationsToShow = () => {
    switch (historyHeadState) {
      case '진행중':
        return filteredReservations.inProgress;
      case '종료된':
        return filteredReservations.ended;
      default:
        return reservationList;
    }
  };

  return (
    <>
      <HistoryHead
        totalCount={reservationList.length}
        inProgressCount={filteredReservations.inProgress.length}
        completedCount={filteredReservations.ended.length}
        historyHeadState={historyHeadState}
        handleHeadState={setHistoryHeadState}
      />
      <CustomSuspense
        fallback={
          <main className="w-full max-h-reservationListMain pt-5 pb-10 flex flex-col top-[117px] absolute justify-start items-center gap-y-[10px] overflow-y-scroll">
            {[1, 2, 3, 4].map((index) => (
              <HistoryInProgressItemSkeleton key={index} />
            ))}
          </main>
        }
      >
        <ReservationList
          reservationList={getReservationsToShow()}
          handleChangeCancelPaymentId={setCancelPaymentId}
          handleChangeCancelReservationId={setCancelReservationId}
        />
      </CustomSuspense>
      <Modal
        size="lg"
        button1Content="이전으로"
        button2Content="취소하기"
        title="예약을 취소하시겠습니까?"
        subTitle="예약 취소 시 수수료가 발생할 수 있습니다"
        secondButtonFunc={handleCancelReservation}
      />
    </>
  );
}
