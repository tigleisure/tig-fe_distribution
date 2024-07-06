'use client';
import ActiveHeartSVG from '@public/svg/activeHeart.svg';
import ActiveSearchSVG from '@public/svg/activeSearch.svg';
import ActiveHomeSVG from '@public/svg/activeHome.svg';
import ActiveListSVG from '@public/svg/activeList.svg';
import ActiveMypageSVG from '@public/svg/activeMypage.svg';
import InActiveHeartSVG from '@public/svg/inactiveHeart.svg';
import InActiveSearchSVG from '@public/svg/inactiveSearch.svg';
import InActiveHomeSVG from '@public/svg/inactiveHome.svg';
import InActiveListSVG from '@public/svg/inactiveList.svg';
import InActiveMypageSVG from '@public/svg/inactiveMypage.svg';
import { type NavItemType } from 'types/all/NavTypes';
import NavItem from './NavItem';

export default function NavBar() {
  const NavLists: NavItemType[] = [
    { path: '/', ActiveIcon: ActiveHomeSVG, InactiveIcon: InActiveHomeSVG },
    {
      path: '/search',
      ActiveIcon: ActiveSearchSVG,
      InactiveIcon: InActiveSearchSVG,
    },
    {
      path: '/reservation-list',
      ActiveIcon: ActiveListSVG,
      InactiveIcon: InActiveListSVG,
    },
    {
      path: '/wishlist',
      ActiveIcon: ActiveHeartSVG,
      InactiveIcon: InActiveHeartSVG,
    },
    {
      path: '/mypage',
      ActiveIcon: ActiveMypageSVG,
      InactiveIcon: InActiveMypageSVG,
    },
  ];
  return (
    <section className="w-full h-[54px] bg-white flex justify-around items-center border-t absolute bottom-0 z-20">
      {NavLists.map((navItem) => (
        <NavItem
          key={navItem.path}
          ActiveIcon={navItem.ActiveIcon}
          InactiveIcon={navItem.InactiveIcon}
          path={navItem.path}
        />
      ))}
    </section>
  );
}
