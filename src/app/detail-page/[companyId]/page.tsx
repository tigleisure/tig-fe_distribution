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
import LeftGreyArrow from '@public/svg/leftGreyArrow.svg';
import RightGreyArrow from '@public/svg/rightGreyArrow.svg';
import {
  clubInfoProps,
  useGetSpecificClubInfo,
} from '@apis/club/getSpecificClubInfo';
import TigLoadingPage from '@components/all/TigLoadingPage';
import { useGetSpecificClubInfoForLogin } from '@apis/club/getSpeicificClubInfoForLogin';
import { useGetAllClubReview } from '@apis/detail-page/getAllClubReview';
import { cn } from '@utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { set } from 'date-fns';

const servicesIcon = ['wifi', 'wifi', 'wifi', 'wifi'];
const services = ['무선 인터넷', '무선 인터넷', '무선 인터넷', '무선 인터넷'];

function debounce(func: () => void, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(func, wait);
  };
}

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
  imageUrls: ['https://dummy.link'],
  presignedImageUrls: [],
  amenities: [],
};

export default function Page({ params }: { params: { companyId: string } }) {
  const { data: specificInfoForGuest, isSuccess: isSuccessInfo1 } =
    useGetSpecificClubInfo(params.companyId);
  const { data: specificInfoForUser, isSuccess: isSuccessInfo2 } =
    useGetSpecificClubInfoForLogin(params.companyId);
  const { data: reviewList } = useGetAllClubReview(params.companyId);
  const [clubInfo, setClubInfo] = useState<clubInfoProps>(initialInofo);
  const detailtabArrayWhenNoReview = detailArrayWhenNoReview;
  const detailtabArrayWhenReview = detailArrayWhenReview;
  // const detailInfoRef = useRef<HTMLDivElement>(null);
  // const serviceRef = useRef<HTMLDivElement>(null);
  // const reviewRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement[] | null[]>([]);
  const selectedTab = useTab((state) => state.selectedTab);
  const setSelectedTab = useTab((state) => state.setSelectedTab);
  // useIntersectionObserver(imageRef, () => setSelectedTab('기본정보'),1);
  // useIntersectionObserver(visitedReviewRef, () => setSelectedTab('방문자 리뷰'),1);
  const [imageCount, setImageCount] = useState(0);
  const [back, setBack] = useState(false);
  const searchParams = useSearchParams();

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
    if (localStorage.getItem('accessToken')) {
      setClubInfo(specificInfoForUser?.result || initialInofo);
    } else {
      setClubInfo(specificInfoForGuest?.result || initialInofo);
    }
  }, [specificInfoForGuest, specificInfoForUser]);

  // useEffect(() => {
  //   // 처음 마운트 될 때 ref 간의 거리 차이를 계산함. 이건 calculate scroll 함수가 선언될 시점의 고정 값임 -> 클로저 개념ㄴ
  //   const originReviewDetailDiff =
  //     (reviewRef.current?.getBoundingClientRect().y as number) -
  //     (detailInfoRef.current?.getBoundingClientRect().y as number);

  //   const originReviewServiceDiff =
  //     (reviewRef.current?.getBoundingClientRect().y as number) -
  //     (serviceRef.current?.getBoundingClientRect().y as number);

  //   function calculateScroll() {
  //     // 중간에 스크롤되다가 setSelectedTab('편의시설')에 걸리면 안되니까 가장 아래 요소인 reviewRef의 높이를 기준으로 감지
  //     const reviewRefYValue = reviewRef.current?.getBoundingClientRect().y;

  //     if (reviewRefYValue === originReviewDetailDiff) {
  //       setSelectedTab('기본정보');
  //     }

  //     if (
  //       (reviewRefYValue as number) >= 1 &&
  //       (reviewRefYValue as number) <= originReviewServiceDiff
  //     ) {
  //       setSelectedTab('편의시설');
  //     }

  //     // 방문자 리뷰 탭 쪽에서 reviewRefYValue가 디바이스별로 항상 0. 몇 뭐시기 정도 나옴
  //     if ((reviewRefYValue as number) < 1) {
  //       setSelectedTab('방문자 리뷰');
  //     }
  //   }

  //   const intervalId = setInterval(calculateScroll, 10);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  const scrollToDetailInfoRef = () => {
    if (scrollRef.current[0]) {
      scrollRef.current[0].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  const scrollToServiceRef = () => {
    if (scrollRef.current[1]) {
      scrollRef.current[1].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  const scrollToReviewRef = () => {
    if (scrollRef.current[2]) {
      scrollRef.current[2].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleNextImage = () => {
    setImageCount((prev) => {
      if (prev === clubInfo.imageUrls.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
    setBack(false);
  };

  const handlePrevImage = () => {
    setImageCount((prev) => {
      if (prev === 0) {
        return clubInfo.imageUrls.length - 1;
      } else {
        return prev - 1;
      }
    });
    setBack(true);
  };

  const imageVariant = {
    entry: (back: boolean) => ({
      x: back ? -500 : 500,
      opacity: 0,
      scale: 0,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: (back: boolean) => ({
      x: back ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: { duration: 0.5 },
    }),
  };
  useEffect(() => {
    const changeNavBtn = () => {
      scrollRef.current.forEach((ref, idx) => {
        const topOffset = (ref?.offsetTop ?? 0) - 50;
        const scrollTop = mainRef.current?.scrollTop ?? 0;
        console.log(scrollTop, topOffset);

        if (scrollTop > topOffset) {
          if (idx === 0) setSelectedTab('기본정보');
          if (idx === 1) setSelectedTab('편의시설');
          if (idx === 2) setSelectedTab('방문자 리뷰');
        }
      });
    };

    const debouncedChangeNavBtn = debounce(changeNavBtn, 50);

    const scroll = mainRef.current;

    if (scroll) {
      scroll.addEventListener('scroll', debouncedChangeNavBtn);
    }

    return () => {
      if (scroll) {
        scroll.removeEventListener('scroll', debouncedChangeNavBtn);
      }
    };
  }, [mainRef.current]);

  if (!isSuccessInfo1 || !isSuccessInfo2) {
    return <TigLoadingPage />;
  }

  return (
    <div className="w-full h-full overflow-y-scroll" ref={mainRef}>
      <Header buttonType="back" title={clubInfo.clubName} />
      <Tabs
        tabArray={
          reviewList.result.reviews.length === 0
            ? detailtabArrayWhenNoReview
            : detailtabArrayWhenReview
        }
        from="detail"
        className="top-[68px] !justify-around"
      />
      <div
        ref={(element) => {
          scrollRef.current[0] = element;
        }}
      />
      <div className="w-full h-[240px] max-w-[640px] mt-[138px] relative rounded-[10px] overflow-hidden px-5">
        <div className="w-[38px] h-[21px] absolute bottom-[16px] right-[36px] bg-grey7 text-grey3 title4 z-[100] rounded-[50px] flex justify-center items-center ">
          {imageCount + 1} / {clubInfo.imageUrls.length || 1}
        </div>
        <LeftGreyArrow
          className={cn(
            'absolute top-[50%] left-[20px] transform -translate-y-1/2 w-[20px] h-[20px] z-[100] cursor-pointer',
            {
              hidden: imageCount === 0,
            }
          )}
          onClick={handlePrevImage}
        />
        <RightGreyArrow
          className={cn(
            'absolute top-[50%] right-[23px] transform -translate-y-1/2 w-[20px] h-[20px] z-[100] cursor-pointer',
            {
              hidden: imageCount === clubInfo.imageUrls.length - 1,
            }
          )}
          onClick={handleNextImage}
        />
        <div className="relative w-full h-full">
          <AnimatePresence custom={back}>
            <motion.img
              key={imageCount}
              custom={back}
              variants={imageVariant}
              initial="entry"
              animate="center"
              exit="exit"
              className="absolute w-full h-full object-cover rounded-[10px] select-none"
              src={
                clubInfo.imageUrls.length !== 0
                  ? clubInfo.imageUrls[imageCount]
                  : '/png/dummyDetailImage.png'
              }
              alt="업체 이미지"
            ></motion.img>
          </AnimatePresence>
        </div>
      </div>
      {/* <div className='w-sevenEightWidth h-[80px] bg-primary_orange2 rounded-[10px] mt-[10px] mx-auto'/> */}
      <DetailInfoCard
        {...clubInfo}
        ref={(element) => {
          scrollRef.current[1] = element;
        }}
      />
      <ServicesCard
        services={clubInfo.amenities || services}
        ref={(element) => {
          scrollRef.current[2] = element;
        }}
      />
      <VisitedReviewCard
        avgRating={clubInfo.avgRating}
        ratingCount={clubInfo.ratingCount}
        reviewList={reviewList.result.reviews}
        // ref={visitedReviewRef}
      />
      <ResButtonCard
        companyId={params.companyId}
        type={clubInfo.type || 'TIME'}
        date={searchParams.get('date') || ''}
      />
    </div>
  );
}
