'use client';
import React, { use, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSearchInputInfo } from '@store/searchInfoStore';

interface TimePickerCardProps {
  onTimeSelect?: (time: string) => void;
}

export default function TimePickerCard({ onTimeSelect }: TimePickerCardProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 10, 20, 30, 40, 50];
  const [selectedHour, setSelectedHour] = useState<number>(11);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const searchInputInfo = useSearchInputInfo((state) => state.searchInput);
  const setSearchInputInfo = useSearchInputInfo(
    (state) => state.setSearchInput
  );

  useEffect(() => {
    const time = `${hours[selectedHour].toString().padStart(2, '0')}:${minutes[
      selectedMinute
    ]
      .toString()
      .padStart(2, '0')}`;
    setSearchInputInfo({
      ...searchInputInfo,
      searchTime: time,
    });
    onTimeSelect?.(time);
  }, [selectedHour, selectedMinute]);

  return (
    <section className="w-full flex flex-col items-center">
      <div
        className="relative w-full flex justify-center items-center"
        style={{ height: 200 }}
      >
        {/* 중앙 강조 라인 오버레이 */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[40px] w-full bg-orange-50 rounded-lg z-1"
          style={{ background: '#FFF6EC' }}
        />
        {/* Swiper 영역 */}
        <div className="flex w-full justify-center items-center gap-2">
          <Swiper
            className="h-[200px] overflow-hidden"
            direction={'vertical'}
            slidesPerView={5}
            initialSlide={selectedHour}
            freeMode
            slideToClickedSlide
            loop={true}
            mousewheel
            centeredSlides={true}
            onSlideChange={(swiper) => setSelectedHour(swiper.realIndex)}
            style={{ width: 80 }}
          >
            {hours.map((hour, idx) => (
              <SwiperSlide
                key={hour + 'hour'}
                className={`h-[40px] flex justify-center items-center cursor-pointer text-2xl font-semibold transition-colors duration-200 ${
                  idx === selectedHour
                    ? 'text-primary_orange1 z-20'
                    : 'text-grey4 z-0'
                }`}
              >
                {hour.toString().padStart(2, '0')}
              </SwiperSlide>
            ))}
          </Swiper>
          <span className="text-2xl font-bold text-primary_orange1 z-20">
            :
          </span>
          <Swiper
            className="h-[200px] overflow-hidden"
            direction={'vertical'}
            slidesPerView={5}
            initialSlide={selectedMinute}
            freeMode
            loop={true}
            slideToClickedSlide={true}
            centeredSlides={true}
            onSlideChange={(swiper) => setSelectedMinute(swiper.realIndex)}
            style={{ width: 80 }}
          >
            {minutes.map((minute, idx) => (
              <SwiperSlide
                key={minute + 'minute'}
                className={`h-[40px] flex justify-center items-center cursor-pointer text-2xl font-semibold transition-colors duration-200 ${
                  idx === selectedMinute
                    ? 'text-primary_orange1 z-20'
                    : 'text-grey4 z-0'
                }`}
              >
                {minute.toString().padStart(2, '0')}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
