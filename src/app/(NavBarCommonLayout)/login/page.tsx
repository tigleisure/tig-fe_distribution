'use client';
import Login from '@components/login/Login';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  if (localStorage.getItem('accessToken') !== null) {
    router.replace('/mypage');
  }
  return (
    <main className="w-full h-full">
      <Login />
    </main>
  );
}
