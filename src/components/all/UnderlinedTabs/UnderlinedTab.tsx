'use client';
import useTab from '@store/tabNumberStore';
import { cn } from '@utils/cn';
import { motion } from 'framer-motion';
interface UnderlinedTabProps {
  TabNumber: number;
  name: string;
  className?: string;
}

export default function UnderlinedTab({
  TabNumber,
  name,
  className,
}: UnderlinedTabProps) {
  const currentTab = useTab((state) => state.selectedTab);
  const setCurrentTab = useTab((state) => state.setSelectedTab);
  return (
    <div
      className={cn(
        'w-full flex justify-center items-center relative cursor-pointer title3',
        {
          'text-primary_orange1': currentTab === TabNumber,
          'text-grey6': currentTab !== TabNumber,
        },
        className
      )}
      onClick={() => setCurrentTab(TabNumber)}
    >
      {name}
        {currentTab === TabNumber && (
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
