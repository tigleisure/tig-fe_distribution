'use client';
import Header from '@components/all/Header';
import Tabs from '@components/all/Tabs/Tabs';
import { DetailInfoCard } from '@components/detail-page/DetailInfoCard';
import ResButtonCard from '@components/detail-page/ResButtonCard';
import { ServicesCard } from '@components/detail-page/ServicesCard';
import { VisitedReviewCard } from '@components/detail-page/VisitedReviewCard';
import {
  detailArrayWhenNoReview,
  detailArrayWhenReview,
} from '@constant/constant';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useTab from '@store/tabNumberStore';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ReviewLowerSectionProps } from 'types/reservation-list/review/ReservationListReviewPageTypes';
import DummyDetailImageSVG from '@public/svg/dummyDetailImage.svg';
import {
  clubInfoProps,
  useGetSpecificClubInfo,
} from '@apis/club/getSpecificClubInfo';
import TigLoadingPage from '@components/all/TigLoadingPage';
import { useGetSpecificClubInfoForLogin } from '@apis/club/getSpeicificClubInfoForLogin';
import { useGetAllClubReview } from '@apis/detail-page/getAllClubReview';

const servicesIcon = ['wifi', 'wifi', 'wifi', 'wifi'];
const services = ['무선 인터넷', '무선 인터넷', '무선 인터넷', '무선 인터넷'];

const initialInofo: clubInfoProps = {
  id: '0',
  clubName: 'Dummy',
  address: 'Dummy',
  ratingSum: 0,
  ratingCount: 0,
  avgRating: 0,
  price: 0,
  isHeart: false,
  phoneNumber: '000-0000-0000',
  snsLink: 'https://dummy.link',
  businessHours: '00:00 - 00:00',
  latitude: 0.0,
  longitude: 0.0,
  category: 'Dummy Category',
  type: 'TIME',
  imageUrls: [],
  presignedImageUrls: [],
  amenities: [],
};

export default function Page({ params }: { params: { companyId: string } }) {
  const { data: specificInfoForGuest, isSuccess: isSuccessInfo1 } =
    useGetSpecificClubInfo(params.companyId);
  console.log(specificInfoForGuest);
  const { data: specificInfoForUser, isSuccess: isSuccessInfo2 } =
    useGetSpecificClubInfoForLogin(params.companyId);
  console.log(specificInfoForUser);
  const { data: reviewList } = useGetAllClubReview(params.companyId);
  console.log(reviewList);
  const [clubInfo, setClubInfo] = useState<clubInfoProps>(initialInofo);
  const detailtabArrayWhenNoReview = detailArrayWhenNoReview;
  const detailtabArrayWhenReview = detailArrayWhenReview;
  // const imageRef = useRef<HTMLImageElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const detailInfoRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  // const visitedReviewRef = useRef<HTMLDivElement>(null);
  const selectedTab = useTab((state) => state.selectedTab);
  const setSelectedTab = useTab((state) => state.setSelectedTab);
  // useIntersectionObserver(imageRef, () => setSelectedTab('기본정보'),1);
  // useIntersectionObserver(visitedReviewRef, () => setSelectedTab('방문자 리뷰'),1);

  useEffect(() => {
    if (selectedTab === '기본정보') {
      scrollToDetailInfoRef();
    } else if (selectedTab === '편의시설') {
      scrollToServiceRef();
    } else if (selectedTab === '방문자 리뷰') {
      scrollToReviewRef();
    } else {
    }
  }, [selectedTab]);

  useEffect(() => {
    console.log(localStorage.getItem('accessToken'));
    if (localStorage.getItem('accessToken')) {
      console.log(specificInfoForUser);
      setClubInfo(specificInfoForUser?.result || initialInofo);
    } else {
      console.log(specificInfoForGuest);
      setClubInfo(specificInfoForGuest?.result || initialInofo);
    }
  }, [specificInfoForGuest, specificInfoForUser]);

  useEffect(() => {
    // 처음 마운트 될 때 ref 간의 거리 차이를 계산함. 이건 calculate scroll 함수가 선언될 시점의 고정 값임 -> 클로저 개념ㄴ
    const originReviewDetailDiff =
      (reviewRef.current?.getBoundingClientRect().y as number) -
      (detailInfoRef.current?.getBoundingClientRect().y as number);

    const originReviewServiceDiff =
      (reviewRef.current?.getBoundingClientRect().y as number) -
      (serviceRef.current?.getBoundingClientRect().y as number);

    function calculateScroll() {
      // 중간에 스크롤되다가 setSelectedTab('편의시설')에 걸리면 안되니까 가장 아래 요소인 reviewRef의 높이를 기준으로 감지
      const reviewRefYValue = reviewRef.current?.getBoundingClientRect().y;

      if (reviewRefYValue === originReviewDetailDiff) {
        setSelectedTab('기본정보');
      }

      if (
        (reviewRefYValue as number) >= 1 &&
        (reviewRefYValue as number) <= originReviewServiceDiff
      ) {
        setSelectedTab('편의시설');
      }

      // 방문자 리뷰 탭 쪽에서 reviewRefYValue가 디바이스별로 항상 0. 몇 뭐시기 정도 나옴
      if ((reviewRefYValue as number) < 1) {
        setSelectedTab('방문자 리뷰');
      }
    }

    const intervalId = setInterval(calculateScroll, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const scrollToDetailInfoRef = () => {
    if (detailInfoRef.current) {
      detailInfoRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  const scrollToServiceRef = () => {
    if (serviceRef.current) {
      serviceRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  const scrollToReviewRef = () => {
    if (reviewRef.current) {
      reviewRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (!isSuccessInfo1 || !isSuccessInfo2) {
    return <TigLoadingPage />;
  }

  return (
    <main className="w-full h-full overflow-y-scroll" ref={mainRef}>
      <Header buttonType="back" title={clubInfo.clubName} />
      <Tabs
        tabArray={
          reviewList.result.length === 0
            ? detailtabArrayWhenNoReview
            : detailtabArrayWhenReview
        }
        from="detail"
        className="top-[68px] !justify-around"
      />
      <div ref={detailInfoRef} />
      <div className="w-full max-w-[640px] p-5 pt-[138px]">
        <DummyDetailImageSVG className="w-full h-auto" />
      </div>
      {/* <div className='w-sevenEightWidth h-[80px] bg-primary_orange2 rounded-[10px] mt-[10px] mx-auto'/> */}
      <DetailInfoCard {...clubInfo} ref={serviceRef} />
      <ServicesCard services={clubInfo.amenities || services} ref={reviewRef} />
      <VisitedReviewCard
        avgRating={clubInfo.avgRating}
        ratingCount={clubInfo.ratingCount}
        reviewList={reviewList.result}
        // ref={visitedReviewRef}
      />
      <ResButtonCard
        companyId={params.companyId}
        type={clubInfo.type || 'TIME'}
      />
    </main>
  );
}
