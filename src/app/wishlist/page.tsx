import NavBar from '@components/all/NavBar/NavBar';
import Tabs from '@components/all/Tabs/Tabs';
import { allleisureArray } from '@constant/constant';
import NoneArrowHeader from '@components/all/NoneArrowHeader';
import { ResultCardProps } from 'types/search/result/searchResult';
import ResultCard from '@components/search/result/ResultCard';
import { da } from 'date-fns/locale';

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
  },
];

export default function page() {
  const tabArray = allleisureArray;
  return (
    <div className="flex flex-col h-full mb-[54px] items-center">
      <NoneArrowHeader title="위시리스트" />
      <Tabs
        tabArray={tabArray}
        rounded
        from="wishlist"
        className="w-fit px-5 top-[68px] border-b-[1px] border-grey2"
      />

      <main className="w-full max-h-wishListMain  absolute top-[120px] mt-5 pb-10 overflow-y-scroll">
        {DUMMYRESULTS.map((data, index) => (
          <ResultCard key={index} {...data} />
        ))}
      </main>

      <NavBar />
    </div>
  );
}
