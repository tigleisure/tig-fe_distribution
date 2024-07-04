'use client';
import { ArrowLeftSVG, CloseSVG } from '@public/svg';
import { cn } from '@utils/cn';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  buttonType: 'back' | 'close';
  isCenter?: boolean;
  title: string;
  bgColor?: 'white' | 'grey';
  className?: string;
}

export default function Header({
  buttonType,
  isCenter = false,
  title,
  className,
  bgColor = 'white',
}: HeaderProps) {
  const router = useRouter();
  return (
    <header
      className={cn(
        'w-full h-[44px] flex items-center relative title2 text-grey7 text-base',
        {
          'justify-center': isCenter,
          'pl-[50px]': !isCenter,
          'bg-grey1': bgColor === 'grey',
        },
        className
      )}
    >
      <div
        className="w-[44px] h-[44px] flex items-center justify-center absolute left-0 cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        {buttonType === 'back' ? <ArrowLeftSVG /> : <CloseSVG />}
      </div>
      <p className="mt-[4px]">{title}</p>
    </header>
  );
}
