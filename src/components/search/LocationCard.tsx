import SearchInput from '@components/all/SearchInput';
import InfoCard from './InfoCard';

export default function LocationCard() {
  return (
    <section className="w-full h-[166px] flex flex-col gap-5 p-5 pt-[64px] border-b border-grey2">
      <InfoCard number={1} content="위치를 알려주세요." />
      <SearchInput placeholder="위치나 장소검색" />
    </section>
  );
}
