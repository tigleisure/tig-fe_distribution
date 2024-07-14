'use client';
import NavBar from '@components/all/NavBar/NavBar';
import Tabs from '@components/all/Tabs/Tabs';
import { allleisureArray } from '@constant/constant';
import NoneArrowHeader from '@components/all/NoneArrowHeader';
import { ResultCardProps } from 'types/search/result/searchResult';
import ResultCard from '@components/search/result/ResultCard';
import { da } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import useTab from '@store/tabNumberStore';

const DUMMYRESULTS: ResultCardProps[] = [
  {
    clubName: '스카이락볼링장1',
    clubId: 1,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    gameNameType: '당구',
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
    gameNameType: '볼링',
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
    gameNameType: '스크린골프',
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
    gameNameType: '탁구',
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
    gameNameType: '테니스',
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
    gameNameType: '당구',
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
    gameNameType: '볼링',
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
    gameNameType: '스크린골프',
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
    gameNameType: '테니스',
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
    gameNameType: '당구',
    isEvent: true,
    isHeart: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장1',
    clubId: 11,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    gameNameType: '당구',
    isEvent: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장2',
    clubId: 12,
    location:
      '서울특별시 강남구 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    gameNameType: '볼링',
    isHeart: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장3',
    clubId: 13,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    gameNameType: '스크린골프',
    isHeart: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장4',
    clubId: 14,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    gameNameType: '탁구',
    isEvent: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장5',
    clubId: 15,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    gameNameType: '테니스',
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장1',
    clubId: 16,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    gameNameType: '당구',
    isEvent: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장1',
    clubId: 17,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    gameNameType: '당구',
    isEvent: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장1',
    clubId: 18,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    gameNameType: '당구',
    isEvent: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장1',
    clubId: 19,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    gameNameType: '당구',
    isEvent: true,
    image: '/png/dummyImage.png',
  },
  {
    clubName: '스카이락볼링장1',
    clubId: 20,
    location: '서울특별시 강남구 역삼동',
    rating: 4.5,
    reviewCount: 100,
    price: '10,000원',
    gameType: '게임',
    gameNameType: '당구',
    isEvent: true,
    image: '/png/dummyImage.png',
  },
];

export default function Page() {
  const selectedTab = useTab((state) => state.selectedTab);
  const [wishList, setWishList] = useState<ResultCardProps[]>([]);

  useEffect(() => {
    // async function getWishlist() {
    //   const response = await fetch(
    //     'https://api.tigleisure.com/api/v1/wishlist',
    //     {
    //       credentials: 'include',
    //     }
    //   );
    //   const data = await response.json();
    //   console.log(data);
    //   // setWishList(data);
    // }
    // getWishlist();

    setWishList(DUMMYRESULTS);
  }, []);

  const tabArray = allleisureArray;
  return (
    <div className="flex flex-col h-full pb-[54px] items-center">
      <NoneArrowHeader title="위시리스트" />
      <Tabs
        tabArray={tabArray}
        rounded
        from="wishlist"
        className="w-fit px-5 top-[68px] border-b-[1px] border-grey2"
      />

      {selectedTab === '전체' && (
        <main className="w-full max-h-wishListMain absolute top-[120px] pb-10 overflow-y-scroll">
          {wishList.map((data, index) => (
            <ResultCard key={index} {...data} />
          ))}
        </main>
      )}

      {selectedTab !== '전체' && (
        <main className="w-full max-h-wishListMain  absolute top-[120px] pb-10 overflow-y-scroll">
          {wishList
            .filter((wishListItem) => wishListItem.gameNameType === selectedTab)
            .map((data) => (
              <ResultCard key={data.clubId} {...data} />
            ))}
        </main>
      )}

      {/* <NavBar /> */}
    </div>
  );
}
