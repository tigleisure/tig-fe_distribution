'use client';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { type NavItemType } from 'types/all/NavTypes';

export default function NavItem({
  ActiveIcon,
  InactiveIcon,
  path,
}: NavItemType) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === path;
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        router.push(path);
      }}
    >
      {isActive ? <ActiveIcon /> : <InactiveIcon />}
    </div>
  );
}
