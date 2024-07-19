'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type NavItemType } from 'types/all/NavTypes';
import { useState, useEffect } from 'react';

export default function NavItem({
  ActiveIcon,
  InactiveIcon,
  path,
}: NavItemType) {
  const pathname: string | null = usePathname();

  const [localStorageAccessToken, setLocalStorageAccessToken] = useState<
    string | null
  >(null);

  useEffect(() => {
    setLocalStorageAccessToken(localStorage.getItem('accessToken'));
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
