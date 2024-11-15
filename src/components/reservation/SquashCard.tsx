import InfoCard from '@components/all/InfoCard';
import ChooseCard from './ChooseCard';
import { BaseballPrice, SquashPrice } from '@apis/reservation/getClubResInfo';
import GameCountCard from './GameCountCard';
import { getProgramDescription } from '@utils/programName';
import { get } from 'http';

export default function SquashCard({ prices }: { prices: SquashPrice[] }) {
  return (
    <section className="w-full flex flex-col p-5 mt-5 border-b border-grey2">
      <InfoCard number={3} content="원하는 게임을 인원 수 만큼 선택해주세요." />
      <div className="w-full flex flex-col gap-3 mt-5">
        {prices &&
          prices.map((price, idx) => (
            <GameCountCard
              key={idx}
              name={
                price.duration === -1
                  ? '원데이클래스'
                  : String(price.duration) + '분'
              }
              price={price.price}
            />
          ))}
      </div>
    </section>
  );
}
