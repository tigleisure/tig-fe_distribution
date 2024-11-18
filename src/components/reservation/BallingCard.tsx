import InfoCard from '@components/all/InfoCard';
import ChooseCard from './ChooseCard';
import { BallingPrice } from '@apis/reservation/getClubResInfo';
import GameCountCard from './GameCountCard';
import { getProgramDescription } from '@utils/programName';
import GameCountDistinWeekCard from './GameCountDistinWeekCard';
import ReservationInfoCard from './ReservationInfoCard';

export default function BallingCard({
  prices,
  isWeek,
}: {
  prices: BallingPrice[];
  isWeek: boolean;
}) {
  console.log(prices);
  return (
    <section className="w-full flex flex-col p-5 mt-5 border-b border-grey2">
      <InfoCard number={4} content="원하는 게임을 인원 수 만큼 선택해주세요." />
      <div className="w-full flex flex-col gap-3 mt-5">
        <ReservationInfoCard />
        {prices &&
          prices.map((price, idx) => (
            <GameCountDistinWeekCard
              isWeek={isWeek}
              key={idx}
              name={
                price.gameCount === -1
                  ? getProgramDescription(price.programName)
                  : price.gameCount + '회'
              }
              price={price.price}
            />
          ))}
      </div>
    </section>
  );
}
