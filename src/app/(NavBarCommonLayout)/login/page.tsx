'use client';
import Login from '@components/login/Login';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import TigLoadingPage from '@components/all/TigLoadingPage';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      router.replace('/mypage');
    }

    setIsLoading(false);
  }, [router]);

  return (
    <>
      {isLoading ? (
        <TigLoadingPage />
      ) : (
        <main className="w-full h-full">
          <Login />
        </main>
      )}
    </>
  );
}
