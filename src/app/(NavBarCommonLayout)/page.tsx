import HomeContent from '@components/home/HomeContent';
import { cookies } from 'next/headers';
import HomeBanner from '@components/home/HomeBanner';

export default function Home() {
  const isLogin = cookies().get('accessToken') !== undefined;

  return (
    <main className="w-full flex flex-col pb-[40px] bg-white shadow-mainShadow">
      <HomeContent isLogin={isLogin}>
        <HomeBanner />
      </HomeContent>
    </main>
  );
}
