import InfoCard from '@components/all/InfoCard';
import React, { useState, useRef, useEffect } from 'react';
import DropboxCheckSVG from '@public/svg/reservation/dropboxCheck.svg';
import DropboxStrokeSVG from '@public/svg/reservation/dropboxStroke.svg';
import { useGameReservationStore } from '@store/makeReservationInfo';
import { usePriceStore } from '@store/priceStore';
const PEOPLE_OPTIONS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  99, 100,
];

export default function ResPeopleCountDropboxCard({
  number = 2,
  from = 'OTHER',
  price = 10000,
}: {
  number?: number;
  from?: 'LUNCH_BOX' | 'OTHER';
  price?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(2);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const setPrice = usePriceStore((state) => state.setPrice);
  const pushPrice = usePriceStore((state) => state.pushPrice);
  const setAdultCount = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );
  const clearPrice = usePriceStore((state) => state.clearPriceStack);

  const inputGameResValue = useGameReservationStore(
    (state) => state.gameReservationInfo
  );

  const setAdultGameResCount = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setAdultCount({ ...inputGameResValue, adultCount: selected });
    if (from === 'LUNCH_BOX' && typeof price === 'number' && price > 0) {
      setPrice(selected * price);
      pushPrice({ name: 'LUNCH_BOX', price: selected * price });

    }
  }, [selected, price]);

  return (
    <section className="w-full flex flex-col p-5 mt-5 border-b border-grey2">
      <InfoCard number={number} content="인원을 선택해주세요." />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[16px] font-semibold">인원 수</span>
        <div className="relative w-[86px]" ref={dropdownRef}>
          <button
            className="w-full px-4 py-3 border-[1px] border-gray-300 rounded-xl bg-white title2 font-medium flex justify-between items-center focus:outline-none"
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
          >
            {selected}명
            <DropboxStrokeSVG
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isOpen && (
            <ul className="absolute top-full left-[-30px] w-[116px] bg-white rounded-xl shadow-lg z-10 mt-2 py-1 overflow-y-scroll max-h-[200px]">
              {PEOPLE_OPTIONS.map((num) => (
                <li
                  key={num}
                  className={`px-4 py-3 cursor-pointer flex justify-between items-center body1
                    ${
                      selected === num
                        ? 'bg-gray-100 text-orange-500 font-bold'
                        : 'hover:bg-gray-100'
                    }
                  `}
                  onClick={() => {
                    setSelected(num);
                    setAdultCount({ ...inputGameResValue, adultCount: num });
                    clearPrice();
                    if (from === 'LUNCH_BOX') {
                      setPrice(num * price);
                      pushPrice({ name: 'LUNCH_BOX', price: num * price });
                    }
                    setAdultGameResCount({
                      ...inputGameResValue,
                      adultCount: num,
                    });
                    setIsOpen(false);
                  }}
                >
                  {num}명{selected === num && <DropboxCheckSVG />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
