'use client';
import Header from '@components/all/Header';
import ButtonCard from '@components/search/ButtonCard';
import DateCard from '@components/search/DateCard';
import LocationCard from '@components/search/LocationCard';
import PeopleCountCard from '@components/search/PeopleCountCard';
import SearchModal from '@components/search/SearchModal';
import TimePickerCard from '@components/search/TimePickerCard';
import useSearchModal from '@store/searchModalStore';

export default function Page() {
  const isModalOpen = useSearchModal(
    (state) => state.selectedIsSearchModalOpen
  );
  return (
    <main className="w-full h-full overflow-y-scroll">
      {!isModalOpen && (
        <Header buttonType="close" isCenter={true} title="검색하기" />
      )}
      <LocationCard />
      <DateCard />
      <TimePickerCard />
      <PeopleCountCard />
      <ButtonCard />
      {isModalOpen && <SearchModal />}
    </main>
  );
}
