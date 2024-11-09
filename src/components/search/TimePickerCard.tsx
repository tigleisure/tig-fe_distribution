'use client';
import React, { use, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import InfoCard from '../all/InfoCard';
import { set } from 'date-fns';
import { useSearchInputInfo } from '@store/searchInfoStore';

export default function TimePickerCard() {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 30];
  const [selectedHour, setSelectedHour] = useState<number>(11);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const searchInputInfo = useSearchInputInfo((state) => state.searchInput);
  const setSearchInputInfo = useSearchInputInfo(
    (state) => state.setSearchInput
  );

  useEffect(() => {
    setSearchInputInfo({
      ...searchInputInfo,
      searchTime: `${hours[selectedHour]}:${minutes[selectedMinute]}`,
    });
  }, [selectedHour, selectedMinute]);

  return (
    <section className="w-full flex flex-col gap-5 p-5 mb-[100px]">
      <InfoCard number={3} content="시간을 선택해주세요." />
      <div className="w-full h-[160px] flex justify-center items-center title2">
        <Swiper
          className="h-[200px] overflow-hidden"
          direction={'vertical'}
          slidesPerView={7}
          initialSlide={selectedHour}
          freeMode
          slideToClickedSlide
          loop={true}
          mousewheel
          centeredSlides={true}
          onSlideChange={(swiper) => setSelectedHour(swiper.realIndex)}
        >
          {hours.map((hour, idx) => (
            <SwiperSlide
              key={hour + 'hour'}
              className={`h-[40px] w-[50px] flex justify-center items-center cursor-pointer ${
                idx === selectedHour ? 'text-black' : 'text-grey4'
              }`}
            >
              {hour}
            </SwiperSlide>
          ))}
        </Swiper>
        :
        <Swiper
          className="h-[200px] overflow-scroll"
          direction={'vertical'}
          slidesPerView={7}
          initialSlide={selectedMinute}
          slideToClickedSlide={true}
          centeredSlides={true}
          onSlideChange={(swiper) => setSelectedMinute(swiper.realIndex)}
        >
          {minutes.map((minute, idx) => (
            <SwiperSlide
              key={minute + 'minute'}
              className={`h-[40px] w-[50px] flex justify-center items-center cursor-pointer ${
                idx === selectedMinute ? 'text-black' : 'text-grey4'
              }`}
            >
              {minute}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
