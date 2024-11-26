import { cn } from '@utils/cn';
import { useRef, useEffect, useState } from 'react';
import UITab from './UITab';

interface TabsProps {
  className?: string;
  tabArray: string[];
  from: string;
}

export default function UITabs({ className, tabArray, from }: TabsProps) {
  const scrollContainerRef = useRef<HTMLElement>(null);

  // 스크롤 위치를 localStorage에 저장
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        console.log(scrollPosition);

        // 스크롤 위치를 localStorage에 저장
        localStorage.setItem('scrollPosition', scrollPosition.toString());
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // 렌더링 후 localStorage에서 스크롤 위치 복원
  useEffect(() => {
    if (scrollContainerRef.current) {
      const savedScrollPosition = localStorage.getItem('scrollPosition');
      if (savedScrollPosition !== null) {
        scrollContainerRef.current.scrollLeft = parseInt(
          savedScrollPosition,
          10
        );
      }
    }
  }, []);

  return (
    <section
      ref={scrollContainerRef}
      className={cn(
        'w-full flex h-[90px] overflow-x-scroll absolute bg-white z-[300] items-center gap-[16px]',
        className
      )}
    >
      {tabArray.map((tab) => (
        <UITab key={tab} name={tab} defaultName={tabArray[0]} />
      ))}
    </section>
  );
}
