'use client';
import useTab from '@store/tabNumberStore';
import { cn } from '@utils/cn';
import { motion } from 'framer-motion';

interface TabProps {
  TabNumber: number;
  name: string;
  className?: string;
  rounded?: boolean;
}

export default function Tab({
  TabNumber,
  name,
  className,
  rounded = false
}: TabProps) {
  const currentTab = useTab((state) => state.selectedTab);
  const setCurrentTab = useTab((state) => state.setSelectedTab);
  return (
    <div
      className={cn(
        'flex justify-center items-center relative cursor-pointer title3',
        {
          'text-primary_orange1': (currentTab === TabNumber) && !rounded,
          'text-grey6': (currentTab !== TabNumber) && !rounded,
          'text-white h-[30px] bg-primary_orange1 border border-primary_orange1': (currentTab === TabNumber) && rounded,
          'text-grey6 h-[30px] border border-grey3': (currentTab !== TabNumber) && rounded,
          'w-full': !rounded,
          'w-fit rounded-[50px] px-[14px] py-[10px] shrink-0': rounded,
          'ml-[20px]': (TabNumber === 0) && rounded
        },
        className
      )}
      onClick={() => setCurrentTab(TabNumber)}
    >
      {name}
        {!rounded && currentTab === TabNumber && (
          <motion.div layoutId="underline"
          className={cn(
            'w-full h-[1px] absolute bottom-0',
            {
              'bg-primary_orange1': currentTab === TabNumber,
              'bg-transparent': currentTab !== TabNumber,
            },
            className
          )}
        />)}
    </div>
  );
}
