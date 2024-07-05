import Header from '@components/all/Header';
import ButtonCard from '@components/search/ButtonCard';
import DateCard from '@components/search/DateCard';
import LocationCard from '@components/search/LocationCard';
import PeopleCountCard from '@components/search/PeopleCountCard';

export default function Page() {
  return (
    <main className="w-full h-full overflow-y-scroll">
      <Header buttonType="close" isCenter={true} title="검색하기" />
      <LocationCard />
      <DateCard />
      <PeopleCountCard />
      <ButtonCard />
    </main>
  );
}
