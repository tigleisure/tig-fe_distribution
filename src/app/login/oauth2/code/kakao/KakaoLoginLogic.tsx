'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function KakaoLoginLogic() {
  const router = useRouter();
  const data = useSearchParams();
  const authCode = data?.get('code');

  useEffect(() => {
    async function sendAuthCodeToBackend() {
      try {
        const response = await fetch(
          `https://api.tigleisure.com/callback?code=${authCode}`,
          {
            credentials: 'include',
          }
        );

        if (response.ok) {
          const data = response.json();
          console.log(data);
          router.replace('/');
          console.log('hi');
        } else {
          throw new Error(
            '인증 코드를 기반으로 로그인 하는 데에 실패했습니다!'
          );
        }
      } catch (error) {
        alert(error);
      }
    }

    if (authCode) {
      sendAuthCodeToBackend();
    }
  }, [authCode]);
  return <div>This is kakao login 리다이렉트 uri 페이지</div>;
}
