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
import { start } from 'repl';
import { generateTimeSlots } from '@utils/generateTimeSlots';
import { formatDate, set } from 'date-fns';
import { usePriceStore } from '@store/priceStore';
import { format } from 'path';

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
  request: string | undefined;
  gameDescription: string | undefined;
}

export default function Page({
  params,
  searchParams,
}: {
  params: { clubId: string };
  searchParams: searchParamsProps;
}) {
  console.log('rendring');
  const router = useRouter();
  const price = usePriceStore((state) => state.price);
  // 금액이슈 일단보류..
  const formatDayOfWeek = formatDate(new Date(), 'EEE').toUpperCase();
  const isFromReservationPage = usePriceStore(
    (state) => state.isFromReservation
  );
  const setPrice = usePriceStore((state) => state.setPrice);
  const setIsFromReservation = usePriceStore(
    (state) => state.setIsFromReservation
  );
  useEffect(() => {
    if (!isFromReservationPage) {
      router.replace(
        `/reservation/game/${params.clubId}?date=${formatDate(
          new Date(),
          "yyyy-MM-dd'T'HH:mm:ss"
        )}&dayOfWeek=${formatDayOfWeek}`
      );
    }
    return () => {
      console.log('unmount');
      setPrice(0);
      setIsFromReservation(false);
    };
  }, []);

  const reservationStageState = useReservationStage(
    (state) => state.reservationStage
  );

  const setReservationStageState = useReservationStage(
    (state) => state.setReservationStage
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
  // 시간타입에 대한 로직 짜보기
  const startTime =
    reservationSearchParmasObject.startTime?.slice(11, 16) || '10:00';
  const endTime =
    reservationSearchParmasObject.endTime?.slice(11, 16) || '12:00';
  const generatedTimeSlots = generateTimeSlots(startTime, endTime);
  // const priceTable = clubSpecificInfoResponse.data?.result.price as string[];
  // const programPriceTable = priceTable.

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
        : '2024-11-13T00:00:00',
      gameCount: reservationSearchParmasObject.gameCount
        ? reservationSearchParmasObject.gameCount
        : 0,
      clubName: reservationSearchParmasObject.clubName
        ? reservationSearchParmasObject.clubName
        : '',
      clubAddress: reservationSearchParmasObject.address
        ? reservationSearchParmasObject.address
        : '',
      // 추후 제대로 설정해야 함
      price: price,
      message: reservationSearchParmasObject.request || '',
      gameDescription: reservationSearchParmasObject.gameDescription || '',
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
        price: price,
        paymentMethod: null,
      };
    }
    setSecondStageInfoObject(secondStageObjData);
  }, [userInfoResponse.data, clubSpecificInfoResponse.data]);

  // 해당 페이지로 들어왔는데, 쿼리스트링에 있는 type과 백엔드에 물어본 업체의 gameType 정보가 다르면 결제하면 안되므로 강제로 홈으로 리다이렉트
  // useEffect(() => {
  //   if (
  //     clubSpecificInfoResponse.data?.result.type === 'TIME' &&
  //     reservationSearchParmasObject.gameType === 'GAME'
  //   ) {
  //     router.replace('/');
  //   }
  //   if (
  //     clubSpecificInfoResponse.data?.result.type === 'GAME' &&
  //     reservationSearchParmasObject.gameType === 'TIME'
  //   ) {
  //     router.replace('/');
  //   }
  // }, [
  //   clubSpecificInfoResponse.data?.result.type,
  //   reservationSearchParmasObject,
  // ]);

  useEffect(() => {
    return () => {
      setSelectedIsModalOpen(false);
      setReservationStageState(1);
    };
  }, []);
  console.log('secondStageObject', secondStageInfoObject);

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
            content={
              secondStageInfoObject.price -
                secondStageInfoObject.couponDiscountPrice >
              0
                ? `${(
                    secondStageInfoObject.price -
                    secondStageInfoObject.couponDiscountPrice
                  ).toLocaleString()}원 결제하기`
                : '0원 결제하기'
            }
            // content={`${(
            //   secondStageInfoObject.price -
            //   secondStageInfoObject.couponDiscountPrice
            // ).toLocaleString()}원 결제하기`}
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
        title="이름과 휴대폰 번호를 입력해주세요."
        secondButtonFunc={() => setSelectedIsModalOpen(false)}
      />
      <Toaster position="bottom-center" containerStyle={{ bottom: '90px' }} />
    </main>
  ) : (
    <CouponPage />
  );
}
