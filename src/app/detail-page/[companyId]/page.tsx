'use client';
import Header from '@components/all/Header';
import Tabs from '@components/all/Tabs/Tabs';
import { DetailInfoCard } from '@components/detail-page/DetailInfoCard';
import ResButtonCard from '@components/detail-page/ResButtonCard';
import { ServicesCard } from '@components/detail-page/ServicesCard';
import { VisitedReviewCard } from '@components/detail-page/VisitedReviewCard';
import { detailArray } from '@constant/constant';
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

interface DetailPageProps {
  imageUrl: string[];
  clubType: string;
  clubName: string;
  AvgRating: number;
  RatingCount: number;
  location: string;
  GameType: 'time' | 'game';
  price: string;
  startTime: string;
  endTime: string;
  phoneNumber: string;
  sns: string;
  servicesIcon: string[];
  services: string[];
  reviewList: ReviewLowerSectionProps[];
}

const DUMMYDetailPage: DetailPageProps = {
  imageUrl: ['/png/dummyDetailImage.png'],
  clubType: '볼링장',
  clubName: '스카이락 볼링장',
  AvgRating: 4.5,
  RatingCount: 100,
  location: '서울 서대문구 신촌로 73 케이스퀘어 8층',
  GameType: 'time',
  price: '10,000',
  startTime: '10:00',
  endTime: '22:00',
  phoneNumber: '02-1234-5678',
  sns: 'https://www.instagram.com/',
  servicesIcon: ['wifi', 'wifi', 'wifi', 'wifi'],
  services: ['무선 인터넷', '무선 인터넷', '무선 인터넷', '무선 인터넷'],
  reviewList: [
    {
      eventDate: '05.17 (금)',
      adultCount: 2,
      reservationUserName: '김티그',
      rating: 4,
      rateContent:
        '역 근처에 시설도 깔끔하고 좋아요! 신촌 볼링장 하면 꼭 여기로 가요. 직원분들도 친절하고 레일도 많고 최고! 담에 친구들이랑 단체 모임하면 또 갈게요~!',
    },
    {
      eventDate: '05.17 (금)',
      adultCount: 2,
      reservationUserName: '김티그',
      rating: 4,
      rateContent:
        '역 근처에 시설도 깔끔하고 좋아요! 신촌 볼링장 하면 꼭 여기로 가요. 직원분들도 친절하고 레일도 많고 최고! 담에 친구들이랑 단체 모임하면 또 갈게요~!',
    },
    {
      eventDate: '05.17 (금)',
      adultCount: 2,
      reservationUserName: '김티그',
      rating: 4,
      rateContent:
        '역 근처에 시설도 깔끔하고 좋아요! 신촌 볼링장 하면 꼭 여기로 가요. 직원분들도 친절하고 레일도 많고 최고! 담에 친구들이랑 단체 모임하면 또 갈게요~!',
    },
    {
      eventDate: '05.17 (금)',
      adultCount: 2,
      reservationUserName: '김티그',
      rating: 4,
      rateContent:
        '역 근처에 시설도 깔끔하고 좋아요! 신촌 볼링장 하면 꼭 여기로 가요. 직원분들도 친절하고 레일도 많고 최고! 담에 친구들이랑 단체 모임하면 또 갈게요~!',
    },
  ],
};

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
};

export default function Page({ params }: { params: { companyId: string } }) {
  const { data, isSuccess } = useGetSpecificClubInfo(params.companyId);
  const [clubInfo, setClubInfo] = useState<clubInfoProps>(initialInofo);
  const tabArray = detailArray;
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
    if (data) {
      console.log(data);
      setClubInfo(data.result);
    }
  }, [data]);

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

  if (!isSuccess) {
    return <TigLoadingPage />;
  }

  return (
    <main className="w-full h-full overflow-y-scroll" ref={mainRef}>
      <Header buttonType="back" title="업체명" />
      <Tabs
        tabArray={tabArray}
        from="detail"
        className="top-[68px] !justify-around"
      />
      <div ref={detailInfoRef} />
      <div className="w-full max-w-[640px] p-5 pt-[138px]">
        <DummyDetailImageSVG className="w-full h-auto" />
      </div>
      {/* <div className='w-sevenEightWidth h-[80px] bg-primary_orange2 rounded-[10px] mt-[10px] mx-auto'/> */}
      <DetailInfoCard {...clubInfo} ref={serviceRef} />
      <ServicesCard
        servicesIcon={DUMMYDetailPage.servicesIcon}
        services={DUMMYDetailPage.services}
        ref={reviewRef}
      />
      <VisitedReviewCard
        reviewList={DUMMYDetailPage.reviewList}
        AvgRating={DUMMYDetailPage.AvgRating}
        RatingCount={DUMMYDetailPage.RatingCount}
        // ref={visitedReviewRef}
      />
      <ResButtonCard
        companyId={params.companyId}
        type={data?.result.type || 'TIME'}
      />
    </main>
  );
}
