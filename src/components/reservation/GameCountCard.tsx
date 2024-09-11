import InfoCard from '@components/all/InfoCard';
import ChooseCard from '@components/reservation/ChooseCard';
import { ChooseCardProps } from 'types/search/SearchTypes';

const chooseLists: ChooseCardProps[] = [
  { title: '성인', description: '만 19세 이상' },
  { title: '청소년', description: '만 14세 ~ 만 18세' },
  { title: '어린이', description: '만 13세 이하' },
];

export default function GameCountCard() {
  return (
    <section className="w-full flex flex-col p-5 mt-5 border-b border-grey2">
      <InfoCard number={4} content="원하는 게임 수를 선택해주세요." />
      <ChooseCard title="게임" />
    </section>
  );
}
