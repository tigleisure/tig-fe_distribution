import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type NavItemType } from 'types/all/NavTypes';

export default function NavItem({
  ActiveIcon,
  InactiveIcon,
  path,
}: NavItemType) {
  const pathname: string | null = usePathname();
  const targetPath =
    path !== '/mypage'
      ? path
      : localStorage.getItem('accessToken') === null
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
