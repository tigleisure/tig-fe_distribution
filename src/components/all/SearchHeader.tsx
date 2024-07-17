'use client';
import TigSVG from '@public/svg/tig.svg';
import { SearchInput } from './SearchInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@utils/cn';

interface SearchHeaderProps {
  placeholder?: string;
  result?: boolean;
  isHomeOrResultPage?: boolean;
}

export default function SearchHeader({
  placeholder = '위치나 장소 검색',
  result = false,
  isHomeOrResultPage = false,
}: SearchHeaderProps) {
  const router = useRouter();
  return (
    <section className="w-full h-fit pt-4 pb-[2px] px-4 bg-white flex items-center gap-4 absolute top-0 z-10">
      <Link href={'/'} className="shrink-0 cursor-pointer">
        <TigSVG />
      </Link>
      <SearchInput
        placeholder={placeholder}
        className={cn('grow mr-1', {
          'cursor-pointer': isHomeOrResultPage,
        })}
        result={result}
        onClick={
          isHomeOrResultPage
            ? () => {
                router.push('/search');
              }
            : () => {}
        }
        readOnly={isHomeOrResultPage}
      />
    </section>
  );
}
