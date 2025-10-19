'use client';
import useTab from '@store/tabNumberStore';
import { cn } from '@utils/cn';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import BallingSVG from '@public/svg/UITabs/fillBalling.svg';
import BaseballSVG from '@public/svg/UITabs/fillBaseBall.svg';
import FootballSVG from '@public/svg/UITabs/fillFootball.svg';
import GolfSVG from '@public/svg/UITabs/fillGolf.svg';
import PocketballSVG from '@public/svg/UITabs/fillPocketball.svg';
import SquashSVG from '@public/svg/UITabs/fillSquash.svg';
import TabletennisSVG from '@public/svg/UITabs/fillTableTennis.svg';
import TennisSVG from '@public/svg/UITabs/fillTennis.svg';
import AllSVG from '@public/svg/UITabs/fillAll.svg';
import LunchBoxSVG from '@public/svg/UITabs/fillLunchBox.svg';
import GroupUniformSVG from '@public/svg/UITabs/fillGroupUniform.svg';
import GolfCourseSVG from '@public/svg/UITabs/fillGolfCourse.svg';
import PensionSVG from '@public/svg/UITabs/fillPension.svg';
import BusSVG from '@public/svg/UITabs/fillBus.svg';
import OutletCafeSVG from '@public/svg/UITabs/fillOutletCafe.svg';
import UnfillAllSVG from '@public/svg/UITabs/unfillAll.svg';
import UnfillBallingSVG from '@public/svg/UITabs/unfillBalling.svg';
import UnfillBaseballSVG from '@public/svg/UITabs/unfillBaseball.svg';
import UnfillFootballSVG from '@public/svg/UITabs/unfillFootball.svg';
import UnfillGolfSVG from '@public/svg/UITabs/unfillGolf.svg';
import UnfillPocketballSVG from '@public/svg/UITabs/unfillPocketball.svg';
import UnfillSquashSVG from '@public/svg/UITabs/unfillSquash.svg';
import UnfillTabletennisSVG from '@public/svg/UITabs/unfilltableTennis.svg';
import UnfillTennisSVG from '@public/svg/UITabs/unfillTennis.svg';
import UnfillLunchBoxSVG from '@public/svg/UITabs/unfillLunchBox.svg';
import UnfillGroupUniformSVG from '@public/svg/UITabs/unfillGroupUniform.svg';
import UnfillGolfCourseSVG from '@public/svg/UITabs/unfillgolfCourse.svg';
import UnfillPensionSVG from '@public/svg/UITabs/unfillPension.svg';
import UnfillBusSVG from '@public/svg/UITabs/unfillBus.svg';
import UnfillOutletCafeSVG from '@public/svg/UITabs/unfillOutletCafe.svg';
import { usePathname, useRouter } from 'next/navigation';
import {
  categoryMapKorToEng,
  packageArrayMapKorToEng,
} from '@constant/constant';

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
      if (Object.keys(categoryMapKorToEng).includes(name)) {
        router.push(`/home/${categoryMapKorToEng[name]}`);
      } else {
        router.push(`/home/${packageArrayMapKorToEng[name]}`);
      }
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
  if (name === '골프') {
    return renderTab(name, GolfSVG, UnfillGolfSVG);
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
  if (name === '도시락') {
    return renderTab(name, LunchBoxSVG, UnfillLunchBoxSVG);
  }
  if (name === '단체복') {
    return renderTab(name, GroupUniformSVG, UnfillGroupUniformSVG);
  }
  if (name === '골프장') {
    return renderTab(name, GolfCourseSVG, UnfillGolfCourseSVG);
  }
  if (name === '펜션') {
    return renderTab(name, PensionSVG, UnfillPensionSVG);
  }
  if (name === '버스') {
    return renderTab(name, BusSVG, UnfillBusSVG);
  }
  if (name === '출장뷔페') {
    return renderTab(name, OutletCafeSVG, UnfillOutletCafeSVG);
  }

  return null;
}
