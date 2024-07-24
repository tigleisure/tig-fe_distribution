import { ResultCardProps } from 'types/search/result/searchResult';
import ResultCard from './ResultCard';

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
    avgRating: 4.5,
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
    avgRating: 4.5,
  },
];

export default function NoSearchResult() {
  return (
    <section className="w-full h-full">
      <div className="pt-[200px] flex flex-col gap-[10px] justify-center items-center">
        <p className="title2 text-grey7">검색 결과가 없어요.</p>
      </div>
      <div className="w-full flex flex-col gap5 pt-[62px]">
        <p className="headline2 text-grey7 px-5 ">이런 곳은 어때요?</p>
        <ResultCard {...DUMMYRESULTS[0]} />
        <ResultCard {...DUMMYRESULTS[1]} />
      </div>
    </section>
  );
}
