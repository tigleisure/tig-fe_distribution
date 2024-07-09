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
} from '@store/paymentInfoStore';

export default function Page() {
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

  useEffect(() => {
    // 실제로는 현재 페이지 컴포넌트가 로드될 때, 날짜, 성인수, 청소년수, 어린이수, 시작 시간, 종료시간, 가격을 백엔드로부터 받아서 상태 값을 설정해준다.
    // 일단 임시 데이터를 통해 화면 UI 완성
    const DUMMYFIRSTSTAGEDATA = {
      companyName: '스카이락 볼링장',
      companyAddress: '서울 서대문구 신촌로 73 케이스퀘어 8층',
      eventDate: '05.17 (금)',
      adultCount: 2,
      eventStartTime: '오전 10:00',
      eventEndTime: '오전 11:00',
      stageFirstPrice: 22000,
    };

    setFirstStageInfoObject(DUMMYFIRSTSTAGEDATA);

    const DUMMYSECONDSTAGEDATA = {
      userName: '김티그',
      phoneNumber: '',
      couponDiscountPrice: 0,
      defaultPrice: 22000,
    };

    setSecondStageInfoObject(DUMMYSECONDSTAGEDATA);
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
