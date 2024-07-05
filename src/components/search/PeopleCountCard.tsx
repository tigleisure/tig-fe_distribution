import { ChooseCardProps } from 'types/search/SearchTypes';
import ChooseCard from './ChooseCard';
import InfoCard from './InfoCard';

const chooseLists: ChooseCardProps[] = [
  { title: '성인', description: '만 19세 이상' },
  { title: '청소년', description: '만 14세 ~ 만 18세' },
  { title: '어린이', description: '만 13세 이하' },
];

export default function PeopleCountCard() {
  return (
    <section className="w-full h-[337px] flex flex-col p-5 mt-5">
      <InfoCard number={3} content="인원을 선택해주세요." />
      {chooseLists.map((chooseList) => (
        <ChooseCard
          key={chooseList.description}
          title={chooseList.title}
          description={chooseList.description}
        />
      ))}
    </section>
  );
}
