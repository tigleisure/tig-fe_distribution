import { getSpecificClubInfo } from '@apis/club/getSpecificClubInfo';
import { getSpecificClubInfoForLogin } from '@apis/club/getSpeicificClubInfoForLogin';
import {
  getSpecificPackageInfoForGuest,
  getSpecificPackageInfoForUser,
} from '@apis/club/getSpecificPackageInfo';
import { cookies } from 'next/headers';
import CustomSuspense from '@providers/CustomSuspense';
import DetailPage from './DetailPage';
import TigLoadingPage from '@components/all/TigLoadingPage';
import { clubInfoProps } from 'types/all/ClubInfoTypes';

export default async function Page({
  params,
  searchParams,
}: {
  params: { companyId: string };
  searchParams: { from?: 'sports' | 'package' };
}) {
  const isLogin = cookies().get('accessToken') !== undefined;
  const from = searchParams?.from || 'sports';
  console.log('from', from);
  console.log('searchParams', searchParams);

  if (from === 'sports') {
    const specificInfoForGuest = await getSpecificClubInfo(params.companyId);
    const specificInfoForUser = await getSpecificClubInfoForLogin(
      params.companyId
    );
    if (!isLogin) {
      return (
        <CustomSuspense fallback={<TigLoadingPage />}>
          <DetailPage
            params={params}
            info={specificInfoForGuest.result}
            from={from}
          />
        </CustomSuspense>
      );
    } else {
      return (
        <CustomSuspense fallback={<TigLoadingPage />}>
          <DetailPage
            params={params}
            info={specificInfoForUser.result}
            from={from}
          />
        </CustomSuspense>
      );
    }
  }

  // package 분기: 응답을 clubInfoProps 형태로 매핑
  const pkg = isLogin
    ? await getSpecificPackageInfoForUser(params.companyId)
    : await getSpecificPackageInfoForGuest(params.companyId);

  const mappedInfo: clubInfoProps = {
    clubId: String(pkg.result.id),
    clubName: pkg.result.name,
    address: pkg.result.address,
    ratingSum: pkg.result.ratingSum,
    ratingCount: pkg.result.ratingCount,
    avgRating: pkg.result.averageRating,
    prices: pkg.result.packagePrices.map((p) => ({
      programName: p.optionValue,
      duration: -1,
      price: p.price,
    })),
    isHeart: false,
    phoneNumber: '-',
    snsLink: '/',
    businessHours: '-',
    latitude: 0,
    longitude: 0,
    category: pkg.result.category,
    type: 'TIME',
    imageUrls: pkg.result.imageUrls ?? [],
    presignedImageUrls: pkg.result.presignedImageUrls ?? [],
    amenities: [],
    operatingHours: [],
  };

  return (
    <CustomSuspense fallback={<TigLoadingPage />}>
      <DetailPage params={params} info={mappedInfo} from={from} />
    </CustomSuspense>
  );
}
