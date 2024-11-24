import { cn } from '@utils/cn';
import UITab from './UITab';
import useTab from '@store/tabNumberStore';

interface TabsProps {
  className?: string;
  tabArray: string[];
  from: string;
}

export default function UITabs({ className, tabArray, from }: TabsProps) {
  const currentTab = useTab((state) => state.selectedTab);
  const curTabArrayIdx = tabArray.findIndex((tab) => tab === currentTab) || 0;
  const curTabArray = [
    tabArray[curTabArrayIdx],
    ...tabArray.slice(0, curTabArrayIdx),
    ...tabArray.slice(curTabArrayIdx + 1),
  ];

  return (
    <section
      className={cn(
        'w-full flex h-[90px] overflow-x-scroll absolute bg-white z-[300] items-center gap-[16px]',
        className
      )}
    >
      {curTabArray.map((tab) => (
        <UITab key={from + tab} name={tab} defaultName={tabArray[0]} />
      ))}
    </section>
  );
}
