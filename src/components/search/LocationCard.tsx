'use client';
import SearchInput from '@components/all/SearchInput';
import InfoCard from './InfoCard';
import useSearchModal from '@store/searchModalStore';

export default function LocationCard() {
  const setModal = useSearchModal((state) => state.setSelectedIsSearchModalOpen);
  return (
    <section className="w-full h-fit flex flex-col gap-5 p-5 pt-[88px] border-b border-grey2">
      <InfoCard number={1} content="위치를 알려주세요." />
      <SearchInput
        placeholder="위치나 장소검색"
        onClick={() => setModal(true)}
        className="cursor-pointer"
      />
    </section>
  );
}
