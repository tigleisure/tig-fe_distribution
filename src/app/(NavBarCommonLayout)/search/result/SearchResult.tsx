'use client';
import NavBar from '@components/all/NavBar/NavBar';
import SearchHeader from '@components/all/SearchHeader';
import Tabs from '@components/all/Tabs/Tabs';
import BottomSheet from '@components/search/result/BottomSheet';
import FilterHeader from '@components/search/result/FilterHeader';
import NaverMap from '@components/search/result/NaverMap';
import NoSearchResult from '@components/search/result/NoSearchResult';
import { allleisureArray, categoryMapEngToKor } from '@constant/constant';
import useTab from '@store/tabNumberStore';
import { formatDate, parse } from 'date-fns';
import { ko } from 'date-fns/locale'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ResultCardProps } from 'types/search/result/searchResult';

const DUMMYRESULTS: ResultCardProps[] = [
  {
    clubName: '스카이락볼링장1',
    id: 1,
    address: '서울특별시 강남구 역삼동',
    ratingSum: 4.5,
    ratingCount: 100,
    price: 10000,
    type: 'GAME',
    isEvent: true,
    imageUrls: ['/png/dummyImage.png'],
    category: 'BALLING',
  },
  {
    clubName: '스카이락볼링장2',
    id: 2,
    address:
      '서울특별시 강남구 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동',
    ratingSum: 4.5,
    ratingCount: 100,
    price: 10000,
    type: 'GAME',
    isHeart: true,
    imageUrls: ['/png/dummyImage.png'],
    category: 'BALLING',
  },
  {
    clubName: '스카이락볼링장3',
    id: 3,
    address: '서울특별시 강남구 역삼동',
    ratingSum: 4.5,
    ratingCount: 100,
    price: 10000,
    type: 'GAME',
    isHeart: true,
    imageUrls: ['/png/dummyImage.png'],
    category: 'POCKET_BALL',
  },
  {
    clubName: '스카이락볼링장4',
    id: 4,
    address: '서울특별시 강남구 역삼동',
    ratingSum: 4.5,
    ratingCount: 100,
    price: 10000,
    type: 'GAME',
    isEvent: true,
    imageUrls: ['/png/dummyImage.png'],
    category: 'POCKET_BALL',
  },
  {
    clubName: '스카이락볼링장5',
    id: 5,
    address: '서울특별시 강남구 역삼동',
    ratingSum: 4.5,
    ratingCount: 100,
    price: 10000,
    type: 'GAME',
    imageUrls: ['/png/dummyImage.png'],
    category: 'POCKET_BALL',
  },
  {
    clubName: '스카이락볼링장6',
    id: 6,
    address: '서울특별시 강남구 역삼동',
    ratingSum: 4.5,
    ratingCount: 100,
    price: 10000,
    type: 'GAME',
    isEvent: true,
    isHeart: true,
    imageUrls: ['/png/dummyImage.png'],
    category: 'TABLE_TENNIS',
  },
  {
    clubName: '스카이락볼링장7',
    id: 7,
    address: '서울특별시 강남구 역삼동',
    ratingSum: 4.5,
    ratingCount: 100,
    price: 10000,
    type: 'GAME',
    isEvent: true,
    isHeart: true,
    imageUrls: ['/png/dummyImage.png'],
    category: 'TABLE_TENNIS',
  },
  {
    clubName: '스카이락볼링장8',
    id: 8,
    address: '서울특별시 강남구 역삼동',
    ratingSum: 4.5,
    ratingCount: 100,
    price: 10000,
    type: 'GAME',
    isEvent: true,
    isHeart: true,
    imageUrls: ['/png/dummyImage.png'],
    category: 'TENNIS',
  },
  {
    clubName: '스카이락볼링장9',
    id: 9,
    address: '서울특별시 강남구 역삼동',
    ratingSum: 4.5,
    ratingCount: 100,
    price: 10000,
    type: 'GAME',
    isEvent: true,
    isHeart: true,
    imageUrls: ['/png/dummyImage.png'],
    category: 'BALLING',
  },
  {
    clubName: '스카이락볼링장10',
    id: 10,
    address: '서울특별시 강남구 역삼동',
    ratingSum: 4.5,
    ratingCount: 100,
    price: 10000,
    type: 'GAME',
    isEvent: true,
    isHeart: true,
    imageUrls: ['/png/dummyImage.png'],
    category: 'BALLING',
  },
];

const isResult = true;

export function SearchResult() {
  const tabArray = allleisureArray;
  const searchParams = useSearchParams();
  const { search, date, adultCount, teenagerCount, kidsCount } =
    Object.fromEntries(searchParams.entries());
  const parsedDate = parse(date, "yyyy-MM-dd'T'HH:mm:ss", new Date());
  const formattedDate = formatDate(parsedDate, 'M.dd (EEE)', { locale: ko });

  const selectedTab = useTab((state) => state.selectedTab);
  const [resultCards, setResultCards] =
    useState<ResultCardProps[]>(DUMMYRESULTS);

  useEffect(() => {
    if (selectedTab == '전체') {
      setResultCards(DUMMYRESULTS);
      return;
    } else {
      const filteredResultCards = DUMMYRESULTS.filter(
        (result) => categoryMapEngToKor[result.category] === selectedTab
      );
      setResultCards(filteredResultCards);
    }
  }, [selectedTab]);
  return (
    <div className="w-full h-full flex justify-center items-center text-[200px]">
      <SearchHeader
        result
        placeholder={`${search}, ${formattedDate}${
          adultCount === '0' ? '' : `, 성인 ${adultCount}명`
        }${teenagerCount === '0' ? '' : `, 청소년 ${teenagerCount}명`}${
          kidsCount === '0' ? '' : `, 어린이 ${kidsCount}명 `
        }`}
        isHomeOrResultPage
      />

      <Tabs
        tabArray={tabArray}
        rounded
        from="search"
        className="w-full px-5 top-[58px] resultTab:justify-center"
      />

      <FilterHeader />
      {isResult && <NaverMap />}
      {isResult && <BottomSheet results={resultCards} />}
      {!isResult && <NoSearchResult />}
      {/* <NavBar /> */}
    </div>
  );
}
