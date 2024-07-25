import HomeCard from './HomeCard';
import { Club } from 'types/response/response';

interface HomeCardListProps {
  title: string;
  Card: Club[];
}

export default function HomeCardList({ title, Card }: HomeCardListProps) {
  return (
    <section className="flex flex-col shrink-0 gap-5 ml-5 mb-[60px]">
      <div className="w-full flex">
        <p className="headline2 text-grey7">{title}</p>
      </div>
      <div className="w-full flex gap-[10px] overflow-x-scroll pr-[20px]">
        {Card.map((card, idx) => (
          <HomeCard key={card.imageUrls + String(idx)} {...card} />
        ))}
      </div>
    </section>
  );
}
