'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function ObserveRouteLogin() {
  const pathName = usePathname();
  const previousPage = useRef<string | null>(null); //단순 저장을 위해서 useRef 사용
  useEffect(() => {
    //로그인 페이지에서 저장된 이전페이지가 있다면 이전 페이지를 sessionStorage에 저장
    if (pathName === '/login' && previousPage.current) {
      window.sessionStorage.setItem('prev', previousPage.current);
      return;
    }
    //위 조건에 안 맞다면 현재 Path를 저장한다.
    previousPage.current = pathName;
  }, [pathName]);
  return <></>;
}
