import InfoCard from '@components/all/InfoCard';
import ChooseCard from '@components/reservation/ChooseCard';
import { ChooseCardProps } from 'types/search/SearchTypes';

const chooseLists: ChooseCardProps[] = [
  { title: '참여 인원', description: '모든 연령대 가능 (어린이, 청소년, 성인 포함)' },
];

export default function ResPeopleCountCard() {
  return (
    <section className="w-full flex flex-col p-5 mt-5 border-b border-grey2">
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
