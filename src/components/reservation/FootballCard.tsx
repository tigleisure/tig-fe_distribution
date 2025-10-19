import InfoCard from '@components/all/InfoCard';
import ChooseCard from './ChooseCard';
import { SoccerPrice } from '@apis/reservation/getClubResInfo';
import GameCountCard from './GameCountCard';
import { getProgramDescription } from '@utils/programName';
import ReservationInfoCard from './ReservationInfoCard';

export default function FootballCard({
  prices,
  number = 4,
}: {
  prices: SoccerPrice[];
  number?: number;
}) {
  return (
    <section className="w-full flex flex-col p-5 mt-5 border-b border-grey2">
      <InfoCard
        number={number}
        content="원하는 게임을 인원 수 만큼 선택해주세요."
      />
      <div className="w-full flex flex-col gap-3 mt-5">
        <ReservationInfoCard />
        {prices &&
          prices.map((price, idx) => (
            <GameCountCard
              key={idx}
              name={
                price.duration === -1
                  ? getProgramDescription(price.programName)
                  : getProgramDescription(price.programName) +
                    ' ' +
                    price.duration +
                    '분'
              }
              price={price.price}
            />
          ))}
      </div>
    </section>
  );
}
