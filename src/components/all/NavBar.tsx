'use client';

import {
  ActiveHeartSVG,
  ActiveHomeSVG,
  ActiveSearchSVG,
  ActiveListSVG,
  ActiveMypageSVG,
  InActiveHeartSVG,
  InActiveHomeSVG,
  InActiveSearchSVG,
  InActiveListSVG,
  InActiveMypageSVG,
} from '@public/svg';
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
    <section className="w-full h-[54px] flex justify-around items-center border-t absolute bottom-0">
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
