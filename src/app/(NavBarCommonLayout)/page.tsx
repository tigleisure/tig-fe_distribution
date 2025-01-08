import TigLoadingPage from '@components/all/TigLoadingPage';
import HomeContent from '@components/home/HomeContent';
import CustomSuspense from '@providers/CustomSuspense';

export default function Home() {
  return (
    <CustomSuspense fallback={<TigLoadingPage />}>
      <HomeContent />
    </CustomSuspense>
  );
}
