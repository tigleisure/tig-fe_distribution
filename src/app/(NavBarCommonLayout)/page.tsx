import TigLoadingPage from '@components/all/TigLoadingPage';
import HomeContent from '@components/home/HomeContent';
import CustomSuspense from '@providers/CustomSuspense';
import { cookies } from 'next/headers';
import HomeBanner from '@components/home/HomeBanner';
import UIList from '@components/home/UIList';
import { mainArray } from '@constant/constant';

export default function Home() {
  const isLogin = cookies().get('accessToken') !== undefined;

  return (
    <main className="w-full flex flex-col pb-[40px] bg-white shadow-mainShadow">
      <HomeContent isLogin={isLogin}>
        <HomeBanner />
        <UIList />
      </HomeContent>
    </main>
  );
}
