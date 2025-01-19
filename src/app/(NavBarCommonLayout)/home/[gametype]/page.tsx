import { cookies } from 'next/headers';
import HomeGameTypepage from './HomeGameTypepage';

export default function Page({ params }: { params: { gametype: string } }) {
  return (
    <>
      <HomeGameTypepage
        isLogin={cookies().get('accessToken') !== undefined}
        params={params}
      />
    </>
  );
}
