import { cn } from '@utils/cn';
import UITab from './UITab';
import useTab from '@store/tabNumberStore';

interface TabsProps {
  className?: string;
  tabArray: string[];
  from: string;
}

export default function UITabs({ className, tabArray, from }: TabsProps) {
  return (
    <section
      className={cn(
        'w-full flex h-[90px] overflow-x-scroll absolute bg-white z-[300] items-center gap-[16px]',
        className
      )}
    >
      {tabArray.map((tab) => (
        <UITab key={from + tab} name={tab} defaultName={tabArray[0]} />
      ))}
    </section>
  );
}
