import Header from '@components/all/Header';
import MakeResButtonCard from '@components/reservation/MakeResButtonCard';
import PriceCard from '@components/reservation/PriceCard';
import ResDateCard from '@components/reservation/ResDateCard';
import ResGameCard from '@components/reservation/ResGameCard';
import ResPeopleCountCard from '@components/reservation/ResPeopleCountCard';
import ResReservationCard from '@components/reservation/ResReservationCard';

const DUMMYPRICE = '10,000';

export default function Page() {
  
  return (
    <main className="w-full h-full overflow-y-scroll flex flex-col ">
      <Header buttonType="back" isCenter title="예약하기" />
      <ResDateCard />
      <ResGameCard />
      <ResPeopleCountCard />
      <ResReservationCard />
      <PriceCard price={DUMMYPRICE} />
      <MakeResButtonCard />
    </main>
  )
}
