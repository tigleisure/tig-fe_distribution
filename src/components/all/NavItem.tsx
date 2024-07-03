'use client';

import { usePathname } from 'next/navigation';

interface NavItemProps {
  ActiveIcon: any;
  InactiveIcon: any;
  path: string;
}

export default function NavItem({
  ActiveIcon,
  InactiveIcon,
  path,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === path;
  return <div>
    {isActive ? <ActiveIcon /> : <InactiveIcon />}
  </div>;
}
