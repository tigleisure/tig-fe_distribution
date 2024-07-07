'use client';
import CategorySVG from '@public/svg/category.svg';
import { cn } from '@utils/cn';
import { set } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const filterOption = [
  '추천순',
  '인기순',
  '가까운순',
  '리뷰많은순',
  '저가순',
  '고가순',
];

export default function FilterHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(filterOption[0]);
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
    };
  }, []);

  return (
    <section
      className="absolute top-[110px] flex justify-end h-[32px] title4 text-grey6 w-full pr-5 cursor-pointer z-10 bg-white"
      ref={ref}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <p>{selected}</p>
      <CategorySVG />
      {isOpen && (
        <motion.div
          className="w-[90px] flex flex-col gap-3 p-5 bg-white shadow-filter absolute top-[20px] right-5 rounded-[12px]"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {filterOption.map((filter) => (
            <p
              key={filter}
              className={cn('title4', {
                'text-grey7': filter === selected,
                'text-grey4': filter !== selected,
              })}
              onClick={() => {
                setSelected(filter);
                setIsOpen(false);
              }}
            >
              {filter}
            </p>
          ))}
        </motion.div>
      )}
    </section>
  );
}
