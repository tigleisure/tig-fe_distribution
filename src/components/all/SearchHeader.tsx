import TigSVG from '@public/svg/tig.svg';
import SearchInput from './SearchInput';

export default function SearchHeader() {
  return (
    <section className="w-full py-[2px] px-4 flex items-center gap-4">
      <TigSVG />
      <SearchInput placeholder="위치나 장소 검색" className="grow mr-1" />
    </section>
  );
}
