'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import TigLoadingAnimation from '@public/lottie/TigLoadingAnimation.json';
import { setCookie } from 'cookies-next';

interface kakaoLoginResponseProp {
  result: {
    accessToken: string;
  };
  resultCode: number;
  resultMsg: string;
}

export default function KakaoLoginLogic() {
  const loadingRef = useRef<boolean>(true);
  const router = useRouter();
  const data = useSearchParams();
  const authCode = data?.get('code');

  useEffect(() => {
    async function sendAuthCodeToBackend() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/callback?code=${authCode}`,
          {
            credentials: 'include',
          }
        );

        if (response.ok) {
          const data: kakaoLoginResponseProp = await response.json();
          // TODO: 토큰으로 변경 시 필요 x, 구글에도 적용해야 함
          // localStorage.setItem('accessToken', data.result.accessToken);
          setCookie('accessToken', data.result.accessToken);
          if (
            process.env.NEXT_PUBLIC_DEVELOPMENT_MODE &&
            process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true'
          ) {
            router.push(sessionStorage.getItem('prev') || '/');
          }
        } else {
          throw new Error(
            '인증 코드를 기반으로 로그인 하는 데에 실패했습니다!'
          );
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (authCode) {
      if (loadingRef.current === true) {
        sendAuthCodeToBackend();
        loadingRef.current = false;
      }
    }
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie animationData={TigLoadingAnimation} style={{ width: '20.8%' }} />
    </div>
  );
}
