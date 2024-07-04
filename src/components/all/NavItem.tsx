import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type NavItemType } from 'types/all/NavTypes';

export default function NavItem({
  ActiveIcon,
  InactiveIcon,
  path,
}: NavItemType) {
  const pathname: string | null = usePathname();

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
    <Link href={path} className="cursor-pointer">
      {isActive ? <ActiveIcon /> : <InactiveIcon />}
    </Link>
  );
}
