import { ResultCardProps } from 'types/search/result/searchResult';
import ResultCard from './ResultCard';

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
];

export default function NoSearchResult() {
  return (
    <section className="w-full h-full">
      <div className="pt-[200px] flex flex-col gap-[10px] justify-center items-center">
        <p className="title2 text-grey7">검색 결과가 없어요.</p>
        <p className="caption1 text-grey5">검색 필터를 수정해보세요!</p>
      </div>
      <div className="w-full flex flex-col gap5 pt-[62px]">
        <p className="headline2 text-grey7 px-5 ">이런 곳은 어때요?</p>
        <ResultCard {...DUMMYRESULTS[0]} />
        <ResultCard {...DUMMYRESULTS[1]} />
      </div>
    </section>
  );
}
