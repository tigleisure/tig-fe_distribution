import { getSpecificClubInfo } from '@apis/club/getSpecificClubInfo';
import { getSpecificClubInfoForLogin } from '@apis/club/getSpeicificClubInfoForLogin';
import { cookies } from 'next/headers';
import CustomSuspense from '@providers/CustomSuspense';
import DetailPage from './DetailPage';
import TigLoadingPage from '@components/all/TigLoadingPage';

export default async function Page({
  params,
}: {
  params: { companyId: string };
}) {
  console.log('params', params);
  const specificInfoForGuest = await getSpecificClubInfo(params.companyId);
  const specificInfoForUser = await getSpecificClubInfoForLogin(
    params.companyId
  );
  // console.log('rseponse', specificInfoForGuest);
  // console.log('rseponse', specificInfoForUser);
  console.log('cookie', cookies().get('accessToken'));
  if (cookies().get('accessToken') === undefined) {
    return (
      <CustomSuspense fallback={<TigLoadingPage />}>
        <DetailPage params={params} info={specificInfoForGuest.result} />
      </CustomSuspense>
    );
  } else {
    return (
      <CustomSuspense fallback={<TigLoadingPage />}>
        <DetailPage params={params} info={specificInfoForUser.result} />
      </CustomSuspense>
    );
  }
}
