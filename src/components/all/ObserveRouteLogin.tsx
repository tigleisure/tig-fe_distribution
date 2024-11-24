'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function ObserveRouteLogin() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const previousPage = useRef<string | null>(null); // 단순 저장을 위해서 useRef 사용

  useEffect(() => {
    // 현재 경로와 쿼리 파라미터를 포함한 전체 URL을 구성
    const fullPath = `${pathName}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

    // 로그인 페이지에서 저장된 이전 페이지가 있다면 이전 페이지를 sessionStorage에 저장
    if ((pathName === '/login' || pathName.startsWith('/search')) && previousPage.current) {
      sessionStorage.setItem('prev', previousPage.current);
      return;
    }

    // 위 조건에 안 맞다면 현재 Path를 저장
    previousPage.current = fullPath;
  }, [pathName, searchParams]);

  return null;
}