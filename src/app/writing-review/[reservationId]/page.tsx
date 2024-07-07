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
import { useEffect } from 'react';
import useModal from '@store/modalStore';

const DUMMYREVIEWDATA: HistoryComponentUpperSectionProps = {
  companyName: '스카이락볼링장',
  companyAddress: '서울 서대문구 신촌로 73',
  eventDate: '05.10 (수)',
  eventStartTime: '오전 10:00',
  eventEndTime: '오전 11:00',
  adultCount: 8,
};

export default function Page() {
  const setIsOpen = useModal((state) => state.setSelectedIsModalOpen);
  const router = useRouter();
  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);
  return (
    <div className="w-full flex flex-col items-center h-full bg-grey1">
      <Header buttonType="close" isCenter title="리뷰 작성" bgColor="grey" />
      <div className="w-eightNineWidth h-full mb-[54px]  flex flex-col gap-y-[10px] mt-[44px] pt-5">
        <div className="w-full h-fit bg-white p-5 rounded-xl">
          <HistoryComponentUpperSection
            className="bg-white"
            imageUrl={DUMMYREVIEWDATA.imageUrl}
            companyAddress={DUMMYREVIEWDATA.companyAddress}
            companyName={DUMMYREVIEWDATA.companyName}
            eventDate={DUMMYREVIEWDATA.eventDate}
            eventEndTime={DUMMYREVIEWDATA.eventEndTime}
            eventStartTime={DUMMYREVIEWDATA.eventStartTime}
            adultCount={DUMMYREVIEWDATA.adultCount}
            youngManCount={DUMMYREVIEWDATA.youngManCount}
            kidCount={DUMMYREVIEWDATA.kidCount}
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
              <span className="title4 text-grey7">리뷰를 작성해주세요.</span>
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
  );
}
