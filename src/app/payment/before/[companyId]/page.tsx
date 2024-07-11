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

  const setSelectedIsModalOpen = useModal(
    (state) => state.setSelectedIsModalOpen
  );

  useEffect(() => {
    // 실제로는 현재 페이지 컴포넌트가 로드될 때, 날짜, 성인수, 청소년수, 어린이수, 시작 시간, 종료시간, 가격을 백엔드로부터 받아서 상태 값을 설정해준다.
    // 일단 임시 데이터를 통해 화면 UI 완성
    const DUMMYFIRSTSTAGEDATA: paymentFirstStageInfoProps = {
      companyName: '스카이락 볼링장',
      companyAddress: '서울 서대문구 신촌로 73 케이스퀘어 8층',
      eventDate: '05.17 (금)',
      adultCount: 2,
      eventStartTime: '오전 10:00',
      eventEndTime: '오전 11:00',
      stageFirstPrice: 22000,
    };

    setFirstStageInfoObject(DUMMYFIRSTSTAGEDATA);

    const DUMMYSECONDSTAGEDATA: paymentSecondStageInfoProps = {
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
            content="확인"
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
