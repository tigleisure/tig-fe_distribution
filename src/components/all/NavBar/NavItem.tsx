'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type NavItemType } from 'types/all/NavTypes';
import { useEffect } from 'react';

export default function NavItem({
  ActiveIcon,
  InactiveIcon,
  path,
}: NavItemType) {
  const pathname: string | null = usePathname();
  let localStorageAccessToken: string | null = null;

  useEffect(() => {
    localStorageAccessToken = localStorage.getItem('accessToken');
  }, []);

  const targetPath =
    path !== '/mypage'
      ? path
      : localStorageAccessToken === null
      ? '/login'
      : '/mypage';

  const isActive =
    pathname === '/'
      ? pathname === path
        ? true
        : false
      : path === '/'
      ? false
      : pathname?.startsWith(path)
      ? true
      : false;
  return (
    <Link href={targetPath} className="cursor-pointer">
      {isActive ? <ActiveIcon /> : <InactiveIcon />}
    </Link>
  );
}
