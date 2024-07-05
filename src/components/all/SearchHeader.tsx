import TigSVG from '@public/svg/tig.svg';
import SearchInput from './SearchInput';
import { cn } from '@utils/cn';

interface SearchHeaderProps {
  placeholder?: string;
  result?: boolean;
}

export default function SearchHeader({
  placeholder = '위치나 장소 검색',
  result = false,
}: SearchHeaderProps) {
  return (
    <section className="w-full py-[2px] px-4 bg-white flex items-center gap-4 absolute top-0">
      <TigSVG />
      <SearchInput
        placeholder={placeholder}
        className={cn('grow mr-1 ', {
          'placeholder:text-grey7': result,
        })}
      />
    </section>
  );
}
