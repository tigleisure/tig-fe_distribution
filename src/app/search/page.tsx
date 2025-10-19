'use client';
import Header from '@components/all/Header';
import Tabs from '@components/all/Tabs/Tabs';
import ButtonCard from '@components/search/ButtonCard';
import DateCard from '@components/search/DateCard';
import LocationCard from '@components/search/LocationCard';
import PeopleCountCard from '@components/search/PeopleCountCard';
import SearchModal from '@components/search/SearchModal';
import TimePickerCard from '@components/search/TimePickerCard';
import { mainArray } from '@constant/constant';
import useSearchModal from '@store/searchModalStore';
import useTab from '@store/tabNumberStore';

export default function Page() {
  const isModalOpen = useSearchModal(
    (state) => state.selectedIsSearchModalOpen
  );
  const searchTabArray = mainArray;
  const currentTab = useTab((state) => state.selectedTab);
  return (
    <main className="w-full h-full overflow-y-scroll">
      {!isModalOpen && (
        <Header buttonType="close" isCenter={true} title="검색하기" />
      )}
      <Tabs tabArray={searchTabArray} from="search" className="top-[68px]" />
      {currentTab === '스포츠' && <LocationCard />}
      <DateCard />
      {/* <TimePickerCard /> */}
      <ButtonCard />
      {isModalOpen && <SearchModal />}
    </main>
  );
}
