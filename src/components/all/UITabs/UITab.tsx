'use client';
import useTab from '@store/tabNumberStore';
import { cn } from '@utils/cn';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import BallingSVG from '@public/svg/UITabs/fillBalling.svg';
import BaseballSVG from '@public/svg/UITabs/fillBaseball.svg';
import FootballSVG from '@public/svg/UITabs/fillFootball.svg';
import GolfSVG from '@public/svg/UITabs/fillGolf.svg';
import PocketballSVG from '@public/svg/UITabs/fillPocketball.svg';
import SquashSVG from '@public/svg/UITabs/fillSquash.svg';
import TabletennisSVG from '@public/svg/UITabs/fillTableTennis.svg';
import TennisSVG from '@public/svg/UITabs/fillTennis.svg';
import AllSVG from '@public/svg/UITabs/fillAll.svg';
import UnfillAllSVG from '@public/svg/UITabs/unfillAll.svg';
import UnfillBallingSVG from '@public/svg/UITabs/unfillBalling.svg';
import UnfillBaseballSVG from '@public/svg/UITabs/unfillBaseBall.svg';
import UnfillFootballSVG from '@public/svg/UITabs/unfillFootball.svg';
import UnfillGolfSVG from '@public/svg/UITabs/unfillGolf.svg';
import UnfillPocketballSVG from '@public/svg/UITabs/unfillPocketball.svg';
import UnfillSquashSVG from '@public/svg/UITabs/unfillSquash.svg';
import UnfillTabletennisSVG from '@public/svg/UITabs/unfilltableTennis.svg';
import UnfillTennisSVG from '@public/svg/UITabs/unfillTennis.svg';
import { usePathname, useRouter } from 'next/navigation';
import { se } from 'date-fns/locale';
import { categoryMapKorToEng } from '@constant/constant';

interface TabProps {
  defaultName: string;
  name: string;
  className?: string;
}

export default function UITab({ name, defaultName, className }: TabProps) {
  const currentTab = useTab((state) => state.selectedTab);
  const setCurrentTab = useTab((state) => state.setSelectedTab);
  const router = useRouter();
  const pathname = usePathname();

  const HandleClick = () => {
    if (pathname.startsWith('/home')) {
      router.push(`/home/${categoryMapKorToEng[name]}`);
    } else setCurrentTab(name);
  };

  useEffect(() => {
    setCurrentTab(defaultName);

    return () => {
      setCurrentTab(defaultName);
    };
  }, []);
  const renderTab = (
    name: string,
    IconComponent: React.ComponentType,
    FilledIconComponent: React.ComponentType,
    label?: string
  ) => {
    return (
      <div
        className="w-[50px] h-[70px] flex flex-col gap-1 items-center cursor-pointer"
        onClick={HandleClick}
      >
        {currentTab === name ? <IconComponent /> : <FilledIconComponent />}
        <div
          className={cn('text-grey6', {
            title4: currentTab === name,
            caption2: currentTab !== name,
          })}
        >
          {label || name}
        </div>
      </div>
    );
  };

  if (name === '전체') {
    return renderTab(name, AllSVG, UnfillAllSVG);
  }
  if (name === '당구') {
    return renderTab(name, PocketballSVG, UnfillPocketballSVG);
  }
  if (name === '탁구') {
    return renderTab(name, TabletennisSVG, UnfillTabletennisSVG);
  }
  if (name === '테니스') {
    return renderTab(name, TennisSVG, UnfillTennisSVG);
  }
  if (name === '스크린골프') {
    return renderTab(name, GolfSVG, UnfillGolfSVG, '골프');
  }
  if (name === '축구') {
    return renderTab(name, FootballSVG, UnfillFootballSVG);
  }
  if (name === '야구') {
    return renderTab(name, BaseballSVG, UnfillBaseballSVG);
  }
  if (name === '볼링') {
    return renderTab(name, BallingSVG, UnfillBallingSVG);
  }
  if (name === '스쿼시') {
    return renderTab(name, SquashSVG, UnfillSquashSVG);
  }

  return null;
}
