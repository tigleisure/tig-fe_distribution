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
import TigLoadingPage from '@components/all/TigLoadingPage';
import { usePostReview } from '@apis/writing-review/postReview';
import { QueryClient } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import ToastUI, { toastUIDuration } from '@components/mypage/ToastUI';

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

  const { data, isError, isFetching } = useGetUserSpecificReservationInfo(
    params.reservationId
  );
  const [toastId, setToastId] = useState<string | null>(null);
  const handleRating = () => {
    if (toastId !== null) {
      toast.remove(toastId);
    }
    const id = toast.custom(
      <ToastUI message="별점을 선택해주세요" iswarning={true} />,
      {
        duration: toastUIDuration,
      }
    );

    setToastId(id);
  };

  useEffect(() => {
    if (data && data.result.status !== 'DONE') {
      router.replace('/');
    }
  }, [data]);

  const mutation = usePostReview();

  const [starCount, setStarCount] = useState<number>(0);
  const [reviewContents, setReviewContents] = useState<string>('');

  const handleSubmitReview = () => {
    if (starCount === 0) {
      handleRating();
      return;
    }
    mutation.mutate(
      {
        reservationId: params.reservationId,
        rating: starCount,
        contents: reviewContents,
        adultCount: data?.result.adultCount || 0,
        teenagerCount: data?.result.teenagerCount || 0,
        kidsCount: data?.result.kidsCount || 0,
        startTime: data?.result.startTime || '',
        userName: data?.result.memberName || '',
      },
      {
        onSuccess: () => {
          setIsReviewSubmitted(true);
        },
        onError: () => {
          alert('리뷰 작성이 실패했습니다! 다시 시도해보세요');
        },
      }
    );
  };

  useEffect(() => {
    if (isError === true) {
      router.replace('/');
    }
  }, [isError]);

  useEffect(() => {
    return () => {
      setIsSelectedModalOpen(false);
    };
  }, []);

  console.log(data);
  return (
    <>
      {isFetching && <TigLoadingPage />}
      {!isError && !data && <TigLoadingPage />}
      {data &&
        !isReviewSubmitted &&
        !isError &&
        data.result.status === 'DONE' && (
          <div className="w-full flex flex-col items-center h-full bg-grey1">
            <Header
              buttonType="close"
              isCenter
              title="리뷰 작성"
              bgColor="grey"
            />
            <div className="w-eightNineWidth h-full mb-[100px]  flex flex-col gap-y-[10px] mt-[68px] pt-5 overflow-y-scroll">
              <div className="w-full h-fit bg-white p-5 rounded-xl">
                <HistoryComponentUpperSection
                  className="bg-white"
                  imageUrls={data.result.imageUrls}
                  clubAddress={data.result.clubAddress}
                  clubName={data.result.clubName}
                  eventDate={data.result.date}
                  gameCount={data.result.gameCount}
                  eventEndTime={data.result.endTime}
                  eventStartTime={data.result.startTime}
                  adultCount={data.result.adultCount}
                  teenagerCount={data.result.teenagerCount}
                  kidsCount={data.result.kidsCount}
                />
              </div>
              <div className="w-full h-fit rounded-[10px] bg-white py-5 px-[110px] flex flex-col gap-y-[10px] items-center">
                <span className="title4 text-grey7">평점을 선택해주세요.</span>
                <p className="flex justify-between items-end">
                  {[1, 2, 3, 4, 5].map((num) =>
                    num > starCount ? (
                      <WritingReviewUnfilledStarSVG
                        key={num}
                        onClick={() => setStarCount(num)}
                      />
                    ) : (
                      <WritingReviewFilledStarSVG
                        key={num}
                        onClick={() => setStarCount(num)}
                      />
                    )
                  )}
                </p>
              </div>
              <div className="w-full h-fit grow rounded-[10px] p-5 flex flex-col items-center gap-y-5 bg-white">
                <div className="w-sevenEightWidth h-fit flex justify-between items-center">
                  <p className="flex w-fit whitespace-nowrap justify-between items-center gap-x-1 ">
                    <PencilSVG />
                    <span className="title4 text-grey7">
                      리뷰를 작성해주세요.
                    </span>
                  </p>
                  <div>
                    <span className="title4 text-primary_orange1">
                      {reviewContents.length}
                    </span>
                    <span className="title4 text-grey3">/400</span>
                  </div>
                </div>
                <textarea
                  className="w-sevenEightWidth p-4 rounded-[10px] grow text-black caption3 placeholder:text-grey3 placeholder:caption3 shadow-writingReviewInput focus:outline-none"
                  placeholder="이용하신 시설에 대해 자세한 리뷰를 남겨주세요"
                  value={reviewContents}
                  onChange={(ev) => {
                    setReviewContents(ev.target.value);
                  }}
                  maxLength={400}
                />
              </div>
            </div>
            <FullButton
              size="lg"
              color="white"
              bgColor="black"
              content="작성 완료"
              className="writingReviewButton absolute bottom-[30px]"
              onClick={handleSubmitReview} // 해당 로직에서 백엔드로 전송을 하고 성공하면 그떄 상태를 변경시키는 것이 최종 목적임
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
      {data && isReviewSubmitted && (
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
                // imageUrl={DUMMYREVIEWDATA.imageUrl}
                clubAddress={data.result.clubAddress}
                clubName={data.result.clubName}
                eventDate={data.result.date}
                gameCount={data.result.gameCount}
                eventEndTime={data.result.endTime}
                eventStartTime={data.result.startTime}
                adultCount={data.result.adultCount}
                teenagerCount={data.result.teenagerCount}
                kidsCount={data.result.kidsCount}
              />
              <div className="w-full border-b-[1px] border-grey2" />
              <ReviewLowerSection
                userName={data.result.memberName as string}
                startTime={data.result.date}
                adultCount={data.result.adultCount}
                teenagerCount={data.result.teenagerCount}
                kidsCount={data.result.kidsCount}
                rating={starCount}
                contents={reviewContents}
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
      <Toaster position="bottom-center" containerStyle={{ bottom: '90px' }} />
    </>
  );
}
