'use client';
import CategorySVG from '@public/svg/category.svg';
import { cn } from '@utils/cn';
import { set } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { useFilterOptionStore } from '@store/filterOptionStore';

const filterOption = [
  '추천순',
  '인기순',
  '가까운순',
  '리뷰많은순',
  '저가순',
  '고가순',
];

const itemVariants: Variants = {
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function FilterHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const selected = useFilterOptionStore((state) => state.filterOption);
  const setSelected = useFilterOptionStore((state) => state.setFilterOption);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      setSelected('추천순');
    };
  }, []);

  return (
    <section
      className="absolute top-[148px] flex justify-end items-center h-[52px] title4 text-grey6 right-0 w-[108px] pr-5 cursor-pointer z-[400] bg-gradient-to-l from-white to-transparent"
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <motion.div className="flex" whileTap={{ scale: 0.95 }}>
        <p className="leading-[1.5] title4 pt-[2px]">{selected}</p>
        <CategorySVG />
      </motion.div>
      {isOpen && (
        <motion.div
          ref={ref}
          className="w-[94px] flex flex-col gap-3 p-5 bg-white shadow-md absolute top-[40px] right-5 rounded-[12px] z-[300] border"
          onClick={(e) => e.stopPropagation()}
          initial={{ clipPath: 'inset(10% 50% 90% 50% round 10px)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 10px)' }}
          exit={{ clipPath: 'inset(10% 50% 90% 50% round 10px)' }}
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.7,
            delayChildren: 0.3,
            staggerChildren: 0.05,
          }}
        >
          {filterOption.map((filter) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              key={filter}
              className={cn('title4', {
                'text-grey7': filter === selected,
                'text-grey4': filter !== selected,
              })}
              onClick={(e) => {
                setSelected(filter);
                setIsOpen(false);
              }}
            >
              {filter}
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
