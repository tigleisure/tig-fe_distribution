import TigLoadingPage from '@components/all/TigLoadingPage';
import HomeContent from '@components/home/HomeContent';
import CustomSuspense from '@providers/CustomSuspense';
import { getQueryClient } from '@providers/get-query-client';
import { cookies } from 'next/headers';

export default function Home() {
  return (
    <CustomSuspense fallback={<TigLoadingPage />}>
      <HomeContent isLogin={cookies().get('accessToken') !== undefined} />
    </CustomSuspense>
  );
}
