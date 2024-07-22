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

interface searchParamsProps {
  adultCount: string | undefined;
  teenagerCount: string | undefined;
  kidsCount: string | undefined;
  date: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  gameCount: string | undefined;
  clubName: string | undefined;
  clubAddress: string | undefined;
  gameType: string | undefined;
}

export default function Page({
  params,
  searchParams,
}: {
  params: { clubId: string };
  searchParams: searchParamsProps;
}) {
  console.log(searchParams);
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
  const clubSpecificInfoResponse = useGetSpecificClubInfo(
    parseInt(params.clubId)
  );

  console.log(clubSpecificInfoResponse.data);

  const reservationSearchParmasObject = searchParams;

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
      clubName: reservationSearchParmasObject.clubName
        ? reservationSearchParmasObject.clubName
        : '',
      clubAddress: reservationSearchParmasObject.clubAddress
        ? reservationSearchParmasObject.clubAddress
        : '',
      price: reservationSearchParmasObject.price
        ? parseInt(reservationSearchParmasObject.price)
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
        price: reservationSearchParmasObject.price
          ? parseInt(reservationSearchParmasObject.price)
          : 0,
        paymentMethod: null,
      };
    }
    setSecondStageInfoObject(secondStageObjData);
  }, [userInfoResponse.data, clubSpecificInfoResponse.data]);

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
