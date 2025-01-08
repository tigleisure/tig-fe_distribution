import { cn } from '@utils/cn';
import Tab from './Tab';

interface TabsProps {
  rounded?: boolean;
  className?: string;
  tabArray: string[];
  from: string;
}

export default function Tabs({
  rounded = false,
  className,
  tabArray,
  from,
}: TabsProps) {
  return (
    <section
      className={cn(
        'w-full flex h-[52px] overflow-x-scroll sticky bg-white z-[300] top-0',
        {
          'items-center gap-[6px]': rounded,
          'border-b border-grey2': !rounded,
        },
        className
      )}
    >
      {tabArray.map((tab, index) => (
        <Tab
          key={from + tab}
          name={tab}
          rounded={rounded}
          defaultName={tabArray[0]}
          from={from}
        />
      ))}
    </section>
  );
}
