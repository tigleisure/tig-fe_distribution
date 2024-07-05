import { HomeCardProps } from 'types/home/HomeTypes';
import HomeCard from './HomeCard';

interface HomeCardListProps {
  title: string;
  Card: HomeCardProps[];
}

export default function HomeCardList({ title, Card }: HomeCardListProps) {
  return (
    <section className="flex flex-col shrink-0 gap-5 ml-5 mb-[60px]">
      <div className="w-full flex justify-between">
        <p className="headline2 text-grey7">{title}</p>
        <p className="title4 text-grey5 mr-5">전체보기</p>
      </div>
      <div className="w-full flex gap-[10px] overflow-x-scroll">
        {Card.map((card) => (
          // 카드 중복이 발생한다면 key값 수정해야함
          <HomeCard key={card.clubName} {...card} />
        ))}
      </div>
    </section>
  );
}
