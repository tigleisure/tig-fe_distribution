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
import useTab from '@store/tabNumberStore';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ReviewLowerSectionProps } from 'types/reservation-list/review/ReservationListReviewPageTypes';
import DummyDetailImageSVG from '@public/svg/dummyDetailImage.svg';
import LeftGreyArrow from '@public/svg/leftGreyArrow.svg';
import RightGreyArrow from '@public/svg/rightGreyArrow.svg';
import {
  SpecificClubInfoResponse,
  useGetSpecificClubInfo,
} from '@apis/club/getSpecificClubInfo';
import TigLoadingPage from '@components/all/TigLoadingPage';
import { useGetSpecificClubInfoForLogin } from '@apis/club/getSpeicificClubInfoForLogin';
import { useGetAllClubReview } from '@apis/detail-page/getAllClubReview';
import { cn } from '@utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { set } from 'date-fns';
import { clubInfoProps } from 'types/all/ClubInfoTypes';
import { useGetAllPackageReview } from '@apis/detail-page/getAllPackageReview';

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
  clubId: '0',
  clubName: 'Dummy',
  address: 'Dummy',
  ratingSum: 0,
  ratingCount: 0,
  avgRating: 0,
  prices: [],
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
  operatingHours: [],
};

export default function DetailPage({
  params,
  info,
  from = 'sports',
}: {
  params: { companyId: string };
  info: clubInfoProps;
  from?: 'sports' | 'package';
}) {
  const { data: clubReviewList } = useGetAllClubReview(params.companyId);
  const { data: packageReviewList } = useGetAllPackageReview(params.companyId);
  // package는 리뷰API가 없어 임시 분기처리
  const finalReviewData =
    from === 'sports' ? clubReviewList : packageReviewList;
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
      if (prev === info.imageUrls.length - 1) {
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
        return info.imageUrls.length - 1;
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
  }, [setSelectedTab]);

  return (
    <div className="w-full h-full overflow-y-scroll" ref={mainRef}>
      <Header buttonType="back" title={info.clubName} />
      <Tabs
        tabArray={
          from === 'package'
            ? detailtabArrayWhenNoReview
            : finalReviewData.result.reviews.length === 0
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
          {imageCount + 1} / {info.imageUrls.length || 1}
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
              hidden: imageCount === info.imageUrls.length - 1,
            }
          )}
          onClick={handleNextImage}
        />
        <div className="relative w-full h-full">
          <AnimatePresence custom={back} initial={false}>
            <motion.img
              key={imageCount}
              custom={back}
              variants={imageVariant}
              initial="entry"
              animate="center"
              exit="exit"
              className="absolute w-full h-full object-cover rounded-[10px] select-none"
              src={
                info.imageUrls.length !== 0
                  ? info.imageUrls[imageCount]
                  : '/png/dummyDetailImage.png'
              }
              alt="업체 이미지"
            ></motion.img>
          </AnimatePresence>
        </div>
      </div>
      {/* <div className='w-sevenEightWidth h-[80px] bg-primary_orange2 rounded-[10px] mt-[10px] mx-auto'/> */}
      <DetailInfoCard
        {...info}
        date={searchParams.get('date') || ''}
        ref={(element) => {
          scrollRef.current[1] = element;
        }}
      />
      <ServicesCard
        services={info.amenities || services}
        ref={(element) => {
          scrollRef.current[2] = element;
        }}
      />
        <VisitedReviewCard
          avgRating={info.avgRating}
          ratingCount={info.ratingCount}
          reviewList={finalReviewData.result.reviews.map(review => ({
            rating: review.rating,
            contents: review.contents,
            userName: review.userName,
            adultCount: 'adultCount' in review ? review.adultCount : 0,
            teenagerCount: 'teenagerCount' in review ? review.teenagerCount : 0,
            kidsCount: 'kidsCount' in review ? review.kidsCount : 0,
            startTime: 'startTime' in review ? review.startTime : '',
          }))}
          reviewSummary={finalReviewData.result.reviewSummary || ''}
          // ref={visitedReviewRef}
        />
      <ResButtonCard
        category={info.category}
        companyId={params.companyId}
        type={info.type || 'TIME'}
        date={searchParams.get('date') || ''}
      />
    </div>
  );
}
