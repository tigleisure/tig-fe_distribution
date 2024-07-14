'use client';
import NavBar from '@components/all/NavBar/NavBar';
import SearchHeader from '@components/all/SearchHeader';
import Tabs from '@components/all/Tabs/Tabs';
import BottomSheet from '@components/search/result/BottomSheet';
import FilterHeader from '@components/search/result/FilterHeader';
import NaverMap from '@components/search/result/NaverMap';
import NoSearchResult from '@components/search/result/NoSearchResult';
import { allleisureArray } from '@constant/constant';
import useTab from '@store/tabNumberStore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ResultCardProps } from 'types/search/result/searchResult';

const DUMMYRESULTS: ResultCardProps[] = [
  {
    clubName: '스카이락볼링장1',
    clubId: 1,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    image: '/png/dummyImage.png',
    gameNameType: '볼링',
  },
  {
    clubName: '스카이락볼링장2',
    clubId: 2,
    location:
      '서울특별시 강남구 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isHeart: true,
    image: '/png/dummyImage.png',
    gameNameType: '볼링',
  },
  {
    clubName: '스카이락볼링장3',
    clubId: 3,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isHeart: true,
    image: '/png/dummyImage.png',
    gameNameType: '당구',
  },
  {
    clubName: '스카이락볼링장4',
    clubId: 4,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    image: '/png/dummyImage.png',
    gameNameType: '당구',
  },
  {
    clubName: '스카이락볼링장5',
    clubId: 5,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    image: '/png/dummyImage.png',
    gameNameType: '당구',
  },
  {
    clubName: '스카이락볼링장6',
    clubId: 6,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    isHeart: true,
    image: '/png/dummyImage.png',
    gameNameType: '탁구',
  },
  {
    clubName: '스카이락볼링장7',
    clubId: 7,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    isHeart: true,
    image: '/png/dummyImage.png',
    gameNameType: '탁구',
  },
  {
    clubName: '스카이락볼링장8',
    clubId: 8,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    isHeart: true,
    image: '/png/dummyImage.png',
    gameNameType: '테니스',
  },
  {
    clubName: '스카이락볼링장9',
    clubId: 9,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    isHeart: true,
    image: '/png/dummyImage.png',
    gameNameType: '볼링',
  },
  {
    clubName: '스카이락볼링장10',
    clubId: 10,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    isHeart: true,
    image: '/png/dummyImage.png',
    gameNameType: '볼링',
  },
];

const isResult = true;

export function SearchResult() {
  const tabArray = allleisureArray;
  const searchParams = useSearchParams();
  const { search, date, adultCount, teenagerCount, kidsCount } =
    Object.fromEntries(searchParams.entries());

  const selectedTab = useTab((state) => state.selectedTab);
  const [resultCards, setResultCards] =
    useState<ResultCardProps[]>(DUMMYRESULTS);

  useEffect(() => {
    if (selectedTab == '전체') {
      setResultCards(DUMMYRESULTS);
      return;
    } else {
      const filteredResultCards = DUMMYRESULTS.filter(
        (result) => result.gameNameType === selectedTab
      );
      setResultCards(filteredResultCards);
    }
  }, [selectedTab]);
  return (
    <div className="w-full h-full flex justify-center items-center text-[200px]">
      <SearchHeader
        result
        placeholder={`${search}, ${date}${
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