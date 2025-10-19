'use client';
import useSubTab from '@store/subTabNumberStore';
import useTab from '@store/tabNumberStore';
import { cn } from '@utils/cn';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface TabProps {
  defaultName: string;
  name: string;
  className?: string;
  rounded?: boolean;
  from?: string;
}

export default function Tab({
  name,
  defaultName,
  className,
  rounded = false,
  from = '',
}: TabProps) {
  const currentTab = useTab((state) => state.selectedTab);
  const setCurrentTab = useTab((state) => state.setSelectedTab);
  const currentSubTab = useSubTab((state) => state.selectedTab);
  const setCurrentSubTab = useSubTab((state) => state.setSelectedTab);

  const HandleClick = () => {
    if (from === 'searchSub' || from === 'gameType') setCurrentSubTab(name);
    else setCurrentTab(name);
  };

  useEffect(() => {
    if (from === 'searchSub' || from === 'gameType')
      setCurrentSubTab(defaultName);
    else setCurrentTab(defaultName);

    return () => {
      if (from === 'searchSub' || from === 'gameType')
        setCurrentSubTab(defaultName);
      else setCurrentTab(defaultName);
    };
  }, []);

  if (from === 'searchSub' || from === 'gameType') {
    return (
      <div
        className={cn(
          'flex justify-center items-center relative cursor-pointer title3',
          {
            'text-primary_orange1': currentSubTab === name && !rounded,
            'text-grey6': currentSubTab !== name && !rounded,
            'text-primary_orange1 h-[34px] bg-primary_orange2 border border-primary_orange1':
              currentSubTab === name && rounded,
            'text-grey5 h-[34px] border border-grey3':
              currentSubTab !== name && rounded,
            'w-fit px-[24px] shrink-0': !rounded,
            'w-fit rounded-[50px] px-[14px] py-[10px] shrink-0': rounded,
          },
          className
        )}
        onClick={HandleClick}
      >
        {name}
        {!rounded && currentSubTab === name && (
          <motion.div
            layoutId="underline"
            className={cn(
              'w-full h-[2px] absolute bottom-0',
              {
                'bg-primary_orange1': currentSubTab === name,
                'bg-transparent': currentSubTab !== name,
              },
              className
            )}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex justify-center items-center relative cursor-pointer title3',
        {
          'text-primary_orange1': currentTab === name && !rounded,
          'text-grey6': currentTab !== name && !rounded,
          'text-primary_orange1 h-[34px] bg-primary_orange2 border border-primary_orange1':
            currentTab === name && rounded,
          'text-grey5 h-[34px] border border-grey3':
            currentTab !== name && rounded,
          'w-fit px-[24px] shrink-0': !rounded,
          'w-fit rounded-[50px] px-[14px] py-[10px] shrink-0': rounded,
          'w-1/2': from === 'search',
        },
        className
      )}
      onClick={HandleClick}
    >
      {name}
      {!rounded && currentTab === name && (
        <motion.div
          layoutId="underline"
          className={cn(
            'w-full h-[2px] absolute bottom-0',
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
