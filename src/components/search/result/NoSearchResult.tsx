import { ResultCardProps } from 'types/search/result/searchResult';
import ResultCard from '../../all/ResultCard';

interface NoSearchResultProps {
  results: ResultCardProps[];
}

export default function NoSearchResult({ results }: NoSearchResultProps) {
  return (
    <section className="w-full h-full">
      <div className="pt-[200px] flex flex-col gap-[10px] justify-center items-center">
        <p className="title2 text-grey7">검색 결과가 없어요.</p>
      </div>
      <div className="w-full flex flex-col gap5 pt-[62px]">
        <p className="headline2 text-grey7 px-5 ">이런 곳은 어때요?</p>
        <ResultCard {...results[0]} />
        <ResultCard {...results[1]} />
      </div>
    </section>
  );
}
