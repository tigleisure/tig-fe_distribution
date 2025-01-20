'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import TigLoadingAnimation from '@public/lottie/TigLoadingAnimation.json';
import { setCookie } from 'cookies-next';

interface GoogleLoginResponseProp {
  result: {
    accessToken: string;
  };
  resultCode: number;
  resultMsg: string;
}

export default function GoogleLoginLogic() {
  const loadingRef = useRef<boolean>(true);
  const router = useRouter();
  const data = useSearchParams();
  const authCode = data?.get('code');

  useEffect(() => {
    async function sendAuthCodeToBackend() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/google/callback?code=${authCode}`,
          {
            credentials: 'include',
          }
        );

        if (response.ok) {
          const data: GoogleLoginResponseProp = await response.json();
          if (
            process.env.NEXT_PUBLIC_DEVELOPMENT_MODE &&
            process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true'
          ) {
            setCookie('accessToken', data.result.accessToken);
          }
          router.push(sessionStorage.getItem('prev') || '/');
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
    <div className="w-full h-full flex justify-center items-center shadow-mainShadow">
      <Lottie animationData={TigLoadingAnimation} style={{ width: '20.8%' }} />
    </div>
  );
}
