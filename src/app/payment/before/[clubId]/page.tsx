'use client';
import Header from '@components/all/Header';
import ReservationStageBar from '@components/payment/before/ReservationStageBar';
import BeforeFirstStageCard from '@components/payment/before/BeforeFirstStageCard';
import BeforeSecondStageCard from '@components/payment/before/BeforeSecondStageCard';
import FullButton from '@components/all/FullButton';
import useReservationStage from '@store/reservationStageStore';
import CouponPage from '@components/payment/before/CouponPage';
import { useEffect } from 'react';
import { useIsCouponPageOpen } from '@store/couponStore';
import {
  usePaymentFirstStage,
  usePaymentSecondStage,
  paymentSecondStageInfoProps,
  paymentFirstStageInfoProps,
} from '@store/paymentInfoStore';
import Modal from '@components/all/Modal';
import useModal from '@store/modalStore';
import { Toaster } from 'react-hot-toast';
import { useGetUserInfo } from '@apis/mypage/getUserInfo';
import { useGetSpecificClubInfo } from '@apis/club/getSpecificClubInfo';
import { calculateTimeDiff } from '@utils/formatDate';
import { useRouter } from 'next/navigation';

interface searchParamsProps {
  adultCount: string | undefined;
  teenagerCount: string | undefined;
  kidsCount: string | undefined;
  date: string | undefined;
  startTime: string | undefined;
  endTime?: string | undefined;
  gameCount?: number | undefined;
  clubName: string | undefined;
  address: string | undefined;
  gameType: string | undefined;
}

export default function Page({
  params,
  searchParams,
}: {
  params: { clubId: string };
  searchParams: searchParamsProps;
}) {
  const reservationStageState = useReservationStage(
    (state) => state.reservationStage
  );
  const isCouponPageOpen = useIsCouponPageOpen(
    (state) => state.isCouponPageOpen
  );

  const firstStageInfoObject = usePaymentFirstStage(
    (state) => state.firstStageInfoObject
  );

  const setFirstStageInfoObject = usePaymentFirstStage(
    (state) => state.setFirstStageInfoObject
  );

  const secondStageInfoObject = usePaymentSecondStage(
    (state) => state.secondStageInfoObject
  );

  const setSecondStageInfoObject = usePaymentSecondStage(
    (state) => state.setSecondStageInfoObject
  );

  const setSelectedIsModalOpen = useModal(
    (state) => state.setSelectedIsModalOpen
  );

  const userInfoResponse = useGetUserInfo();
  const clubSpecificInfoResponse = useGetSpecificClubInfo(params.clubId);

  const reservationSearchParmasObject = searchParams;
  const router = useRouter();

  useEffect(() => {
    const firstStageObjData: paymentFirstStageInfoProps = {
      date: reservationSearchParmasObject.date
        ? reservationSearchParmasObject.date
        : '',
      adultCount: reservationSearchParmasObject.adultCount
        ? parseInt(reservationSearchParmasObject.adultCount)
        : 0,
      teenagerCount: reservationSearchParmasObject.teenagerCount
        ? parseInt(reservationSearchParmasObject.teenagerCount)
        : 0,
      kidsCount: reservationSearchParmasObject.kidsCount
        ? parseInt(reservationSearchParmasObject.kidsCount)
        : 0,
      startTime: reservationSearchParmasObject.startTime
        ? reservationSearchParmasObject.startTime
        : '',
      endTime: reservationSearchParmasObject.endTime
        ? reservationSearchParmasObject.endTime
        : '',
      gameCount: reservationSearchParmasObject.gameCount
        ? reservationSearchParmasObject.gameCount
        : 0,
      clubName: reservationSearchParmasObject.clubName
        ? reservationSearchParmasObject.clubName
        : '',
      clubAddress: reservationSearchParmasObject.address
        ? reservationSearchParmasObject.address
        : '',
      // TIME 타입이면 종료시간 - 시작 시간을 빼서 가격과 곱하고, GAME 타입이면 게임 카운트를 가격에 곱해 계산. type 검사는 쿼리 스트링, 백엔드 api 응답 데이터 이중 검사
      price: clubSpecificInfoResponse.data?.result.price
        ? reservationSearchParmasObject.gameType === 'TIME' &&
          clubSpecificInfoResponse.data.result.type === 'TIME'
          ? clubSpecificInfoResponse.data?.result.price *
            calculateTimeDiff(
              reservationSearchParmasObject.endTime as string,
              reservationSearchParmasObject.startTime as string
            )
          : reservationSearchParmasObject.gameType === 'GAME' &&
            clubSpecificInfoResponse.data.result.type === 'GAME' &&
            reservationSearchParmasObject.gameCount
          ? clubSpecificInfoResponse.data?.result.price *
            reservationSearchParmasObject.gameCount
          : 0
        : 0,
    };

    setFirstStageInfoObject(firstStageObjData);

    let secondStageObjData: paymentSecondStageInfoProps = {
      userName: '',
      phoneNumber: '',
      couponDiscountPrice: 0,
      price: 0,
      paymentMethod: null,
    };
    if (userInfoResponse.data !== undefined) {
      secondStageObjData = {
        userName: userInfoResponse.data.result.name,
        phoneNumber: userInfoResponse.data.result.phoneNumber,
        couponDiscountPrice: 0,
        price: clubSpecificInfoResponse.data?.result.price
          ? reservationSearchParmasObject.gameType === 'TIME' &&
            clubSpecificInfoResponse.data.result.type === 'TIME'
            ? clubSpecificInfoResponse.data?.result.price *
              calculateTimeDiff(
                reservationSearchParmasObject.endTime as string,
                reservationSearchParmasObject.startTime as string
              )
            : reservationSearchParmasObject.gameType === 'GAME' &&
              clubSpecificInfoResponse.data.result.type === 'GAME' &&
              reservationSearchParmasObject.gameCount
            ? clubSpecificInfoResponse.data?.result.price *
              reservationSearchParmasObject.gameCount
            : 0
          : 0,
        paymentMethod: null,
      };
    }
    setSecondStageInfoObject(secondStageObjData);
  }, [userInfoResponse.data, clubSpecificInfoResponse.data]);

  // 해당 페이지로 들어왔는데, 쿼리스트링에 있는 type과 백엔드에 물어본 업체의 gameType 정보가 다르면 결제하면 안되므로 강제로 홈으로 리다이렉트
  useEffect(() => {
    if (
      clubSpecificInfoResponse.data?.result.type === 'TIME' &&
      reservationSearchParmasObject.gameType === 'GAME'
    ) {
      router.replace('/');
    }
    if (
      clubSpecificInfoResponse.data?.result.type === 'GAME' &&
      reservationSearchParmasObject.gameType === 'TIME'
    ) {
      router.replace('/');
    }
  }, [
    clubSpecificInfoResponse.data?.result.type,
    reservationSearchParmasObject,
  ]);

  useEffect(() => {
    return () => setSelectedIsModalOpen(false);
  }, []);

  return !isCouponPageOpen ? (
    <main className="w-full h-full flex flex-col items-center bg-grey1 pb-[100px] overflow-y-scroll">
      <Header
        buttonType="close"
        isCenter
        title="예약확인"
        bgColor="grey"
        className="z-10"
      />
      <ReservationStageBar />
      {reservationStageState === 1 && (
        <BeforeFirstStageCard {...firstStageInfoObject} />
      )}

      {reservationStageState === 2 && (
        <BeforeSecondStageCard {...secondStageInfoObject} />
      )}

      {reservationStageState === 1 && (
        <section className="h-[78px] w-full flex justify-center items-center px-5 py-[14px] absolute bottom-0 bg-grey1 shadow-absoluteButton">
          <FullButton
            size="lg"
            color="white"
            bgColor="primary_orange1"
            content="확인"
            clickTask="move-to-second-payment-stage"
          />
        </section>
      )}

      {reservationStageState === 2 && (
        <section className="h-[78px] w-full flex justify-center items-center px-5 py-[14px] absolute bottom-0 bg-grey1 shadow-absoluteButton">
          <FullButton
            size="lg"
            color="white"
            bgColor="primary_orange1"
            content={`${(
              secondStageInfoObject.price -
              secondStageInfoObject.couponDiscountPrice
            ).toLocaleString()}원 결제하기`}
            clickTask="request-payment"
            sendingData={{
              reservationData: {
                clubId: parseInt(params.clubId),
                memberId: userInfoResponse.data?.result.id as number,
              },
            }}
          />
        </section>
      )}
      <Modal
        size="sm"
        button2Content="확인"
        title="휴대폰 번호를 입력해주세요"
        secondButtonFunc={() => setSelectedIsModalOpen(false)}
      />
      <Toaster position="bottom-center" containerStyle={{ bottom: '90px' }} />
    </main>
  ) : (
    <CouponPage />
  );
}
