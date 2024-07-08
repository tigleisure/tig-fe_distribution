'use client';
import Header from '@components/all/Header';
import ReservationStageBar from '@components/payment/before/ReservationStageBar';
import BeforeFirstStageCard from '@components/payment/before/BeforeFirstStageCard';
import BeforeSecondStageCard from '@components/payment/before/BeforeSecondStageCard';
import FullButton from '@components/all/FullButton';
import useReservationStage from '@store/reservationStageStore';
import CouponPage from '@components/payment/before/CouponPage';
import { useState } from 'react';

const DUMMYFIRSTSTAGEDATA = {
  companyName: '스카이락 볼링장',
  companyAddress: '서울 서대문구 신촌로 73 케이스퀘어 8층',
  eventDate: '05.17 (금)',
  adultCount: 2,
  eventStartTime: '오전 10:00',
  eventEndTime: '오전 11:00',
  stageFirstPrice: 22000,
};

const DUMMYSECONDSTAGEDATA = {
  userName: '김티그',
  phoneNumber: null,
  couponDiscountPrice: 0,
  defaultPrice: 22000,
};

export default function Page() {
  const reservationStageState = useReservationStage(
    (state) => state.reservationStage
  );
  const [isCouponPageOpen, setIsCouponPageOpen] = useState(false);

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
        <BeforeFirstStageCard {...DUMMYFIRSTSTAGEDATA} />
      )}

      {reservationStageState === 2 && (
        <BeforeSecondStageCard
          {...DUMMYSECONDSTAGEDATA}
          handleClickCouponButton={setIsCouponPageOpen}
        />
      )}

      {reservationStageState === 1 && (
        <FullButton
          size="lg"
          color="white"
          bgColor="primary_orange1"
          content="확인"
          className="absolute !w-eightNineWidth bottom-[30px]"
          clickTask="move-to-second-payment-stage"
        />
      )}

      {reservationStageState === 2 && (
        <FullButton
          size="lg"
          color="white"
          bgColor="primary_orange1"
          content="확인"
          className="absolute !w-eightNineWidth bottom-[30px]"
        />
      )}
    </main>
  ) : (
    <CouponPage />
  );
}
