'use client';
import Header from '@components/all/Header';
import HistoryComponentUpperSection from '@components/reservation-list/all/HistoryComponentUpperSection';
import { HistoryComponentUpperSectionProps } from 'types/reservation-list/ReservationListPageTypes';
import WritingReviewUnfilledStarSVG from '@public/svg/wrUnfilledStar.svg';
import WritingReviewFilledStarSVG from '@public/svg/wrFilledStar.svg';
import PencilSVG from '@public/svg/pencil.svg';
import FullButton from '@components/all/FullButton';
import Modal from '@components/all/Modal';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useModal from '@store/modalStore';
import FortyEightTig from '@public/svg/fortyEightTig.svg';
import ReviewLowerSection from '@components/reservation-list/review/ReviewLowerSection';
import { useGetUserSpecificReservationInfo } from '@apis/reservation-list/reservation/getUserSpecificReservationInfo';
import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';
import { instance } from '@apis/instance';

const DUMMYREVIEWDATA: HistoryComponentUpperSectionProps = {
  clubName: '스카이락볼링장',
  clubAddress: '서울 서대문구 신촌로 73',
  eventDate: '05.10 (수)',
  eventStartTime: '오전 10:00',
  eventEndTime: '오전 11:00',
  adultCount: 8,
};

export default function Page({
  params,
}: {
  params: {
    reservationId: number;
  };
}) {
  const setIsSelectedModalOpen = useModal(
    (state) => state.setSelectedIsModalOpen
  );
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const router = useRouter();

  const { data, isError, isSuccess, isPending, status, isFetching, isLoading } =
    useGetUserSpecificReservationInfo(params.reservationId);

  if (isPending === false && data?.status === 500) {
    router.replace('/');
  }

  useEffect(() => {
    return () => {
      setIsSelectedModalOpen(false);
    };
  }, []);
  return (
    <>
      {!isReviewSubmitted && (
        <div className="w-full flex flex-col items-center h-full bg-grey1">
          <Header
            buttonType="close"
            isCenter
            title="리뷰 작성"
            bgColor="grey"
          />
          <div className="w-eightNineWidth h-full mb-[54px]  flex flex-col gap-y-[10px] mt-[68px] pt-5">
            <div className="w-full h-fit bg-white p-5 rounded-xl">
              <HistoryComponentUpperSection
                className="bg-white"
                imageUrl={DUMMYREVIEWDATA.imageUrl}
                clubAddress={DUMMYREVIEWDATA.clubAddress}
                clubName={DUMMYREVIEWDATA.clubName}
                eventDate={DUMMYREVIEWDATA.eventDate}
                eventEndTime={DUMMYREVIEWDATA.eventEndTime}
                eventStartTime={DUMMYREVIEWDATA.eventStartTime}
                adultCount={DUMMYREVIEWDATA.adultCount}
                teenagerCount={DUMMYREVIEWDATA.teenagerCount}
                kidsCount={DUMMYREVIEWDATA.kidsCount}
              />
            </div>
            <div className="w-full h-fit rounded-[10px] bg-white py-5 px-[110px] flex flex-col gap-y-[10px] items-center">
              <span className="title4 text-grey7">평점을 선택해주세요</span>
              <p className="flex justify-between items-end">
                <WritingReviewFilledStarSVG />
                <WritingReviewUnfilledStarSVG />
                <WritingReviewUnfilledStarSVG />
                <WritingReviewUnfilledStarSVG />
                <WritingReviewUnfilledStarSVG />
              </p>
            </div>
            <div className="w-full h-fit grow rounded-[10px] p-5 flex flex-col items-center gap-y-5 bg-white">
              <div className="w-sevenEightWidth h-fit flex justify-between items-center gap-x-[124px]">
                <p className="flex w-fit justify-between items-center gap-x-1">
                  <PencilSVG />
                  <span className="title4 text-grey7">
                    리뷰를 작성해주세요.
                  </span>
                </p>
                <div>
                  <span className="title4 text-primary_orange1">0</span>
                  <span className="title4 text-grey3">/400</span>
                </div>
              </div>
              <textarea
                className="w-sevenEightWidth p-4 rounded-[10px] grow text-black caption3 placeholder:text-grey3 placeholder:caption3 shadow-writingReviewInput focus:outline-none"
                placeholder="이용하신 시설에 대해 자세한 리뷰를 남겨주세요"
              />
            </div>
          </div>
          <FullButton
            size="lg"
            color="white"
            bgColor="black"
            content="작성 완료"
            className="writingReviewButton relative bottom-[30px]"
            onClick={() => setIsReviewSubmitted(true)} // 해당 로직에서 백엔드로 전송을 하고 성공하면 그떄 상태를 변경시키는 것이 최종 목적임
          />
          <Modal
            size="lg"
            button1Content="이어서 작성"
            button2Content="나가기"
            title="리뷰 작성을 취소하고 나가시겠습니까?"
            subTitle="작성한 내용은 모두 초기화됩니다."
            secondButtonFunc={() => router.back()}
          />
        </div>
      )}
      {isReviewSubmitted && (
        <div className="w-full flex flex-col items-center h-full bg-grey1">
          <Header
            buttonType="close"
            isCenter={true}
            title="리뷰 작성"
            bgColor="grey"
            isReviewSubmitted={true}
          />
          <main className="w-eightNineWidth h-fit mt-[68px] flex flex-col items-center gap-y-10">
            <div className="flex flex-col items-center">
              <FortyEightTig />
              <p className="title2 text-grey7 mt-4 mb-2">리뷰 쓰기 완료!</p>
              <p className="caption1 text-grey5">
                장소를 찾는 사람들에게 큰 도움이 될거에요!
              </p>
            </div>
            <section className="w-full h-fit p-5 flex flex-col gap-y-5 bg-white">
              <HistoryComponentUpperSection
                className="bg-white"
                imageUrl={DUMMYREVIEWDATA.imageUrl}
                clubAddress={DUMMYREVIEWDATA.clubAddress}
                clubName={DUMMYREVIEWDATA.clubName}
                eventDate={DUMMYREVIEWDATA.eventDate}
                eventEndTime={DUMMYREVIEWDATA.eventEndTime}
                eventStartTime={DUMMYREVIEWDATA.eventStartTime}
                adultCount={DUMMYREVIEWDATA.adultCount}
                teenagerCount={DUMMYREVIEWDATA.teenagerCount}
                kidsCount={DUMMYREVIEWDATA.kidsCount}
              />
              <div className="w-full border-b-[1px] border-grey2" />
              <ReviewLowerSection
                reservationUserName="김티그"
                eventDate="2024.05.05"
                adultCount={8}
                rating={4}
                rateContent="역 근처에 시설도 깔끔하고 좋아요! 신촌 볼링장 하면 꼭 여기로 가요. 직원분들도 친절하고 레일도 많고 최고! 담에 친구들이랑 단체 모임하면 또 갈게요~!"
              />
            </section>
          </main>
          <FullButton
            size="lg"
            color="white"
            bgColor="black"
            content="확인"
            clickTask="move-to-home-page"
            className="absolute bottom-[30px] !w-eightNineWidth"
          />
        </div>
      )}
    </>
  );
}
