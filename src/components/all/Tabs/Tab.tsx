'use client';
import useTab from '@store/tabNumberStore';
import { cn } from '@utils/cn';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface TabProps {
  defaultName:string;
  name: string;
  className?: string;
  rounded?: boolean;
}

export default function Tab({
  name,
  defaultName,
  className,
  rounded = false,
}: TabProps) {
  const currentTab = useTab((state) => state.selectedTab);
  const setCurrentTab = useTab((state) => state.setSelectedTab);

  useEffect(() => {
    setCurrentTab(defaultName);

    return () => {
      setCurrentTab(defaultName);
    };
  }, []);
  return (
    <div
      className={cn(
        'flex justify-center items-center relative cursor-pointer title3',
        {
          'text-primary_orange1': currentTab === name && !rounded,
          'text-grey6': currentTab !== name && !rounded,
          'text-white h-[30px] bg-primary_orange1 border border-primary_orange1':
            currentTab === name && rounded,
          'text-grey6 h-[30px] border border-grey3':
            currentTab !== name && rounded,
          'w-fit px-[24px] shrink-0': !rounded,
          'w-fit rounded-[50px] px-[14px] py-[10px] shrink-0': rounded,
        },
        className
      )}
      onClick={() => setCurrentTab(name)}
    >
      {name}
      {!rounded && currentTab === name && (
        <motion.div
          layoutId="underline"
          className={cn(
            'w-full h-[1px] absolute bottom-0',
            {
              'bg-primary_orange1': currentTab === name,
              'bg-transparent': currentTab !== name,
            },
            className
          )}
        />
      )}
    </div>
  );
}
