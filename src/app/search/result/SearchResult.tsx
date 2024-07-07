'use client';
import NavBar from '@components/all/NavBar/NavBar';
import SearchHeader from '@components/all/SearchHeader';
import Tabs from '@components/all/Tabs/Tabs';
import BottomSheet from '@components/search/result/BottomSheet';
import FilterHeader from '@components/search/result/FilterHeader';
import NaverMap from '@components/search/result/NaverMap';
import { allleisureArray } from '@constant/constant';
import { useSearchParams } from 'next/navigation';
import { ResultCardProps } from 'types/search/result/searchResult';

const DUMMYRESULTS: ResultCardProps[] = [
  {
    clubName: '스카이락볼링장1',
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장2',
    location:
      '서울특별시 강남구 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isHeart: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장3',
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isHeart: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장4',
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장5',
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장6',
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    isHeart: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장7',
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    isHeart: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장8',
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    isHeart: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장9',
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    isHeart: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장10',
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    isEvent: true,
    isHeart: true,
    image: '/png/dummyImage.png',
  },
];

export function SearchResult() {
  const tabArray = allleisureArray;
  const searchParams = useSearchParams();
  console.log(searchParams);
  const { location, date, adultCount } = Object.fromEntries(
    searchParams.entries()
  );
  return (
    <div className="w-full h-full flex justify-center items-center text-[200px]">
      <SearchHeader
        result
        placeholder={`${location}, ${date}, 성인${adultCount}명`}
      />

      <Tabs
        tabArray={tabArray}
        rounded
        from="search"
        className="w-full px-5 top-[58px] resultTab:justify-center"
      />

      <FilterHeader />
      <NaverMap />
      <BottomSheet results={DUMMYRESULTS} />
      <NavBar />
    </div>
  );
}
