import { PackagePriceItem } from '@apis/club/getSpecificPackageInfo';
import { instance } from '@apis/instance';
import { useQuery } from '@tanstack/react-query';

interface Result {
  packageName: string;
  address: string;
  prices: PackagePriceItem[];
  category:
    | 'GOLF_COURSE'
    | 'CATERING'
    | 'LUNCH_BOX'
    | 'GROUP_UNIFORM'
    | 'PENSION'
    | 'BUS';
  averageRating: number;
  reviewCount: number;
}

interface GetPackageResInfoResponse {
  result: Result;
  resultCode: number;
  resultMsg: string;
}

const getPackageResInfo = async (
  packageId: string
): Promise<GetPackageResInfoResponse> => {
  return instance.get(`/api/v1/reservation/package-set/${packageId}`);
};

export const useGetPackageResInfo = (packageId: string) => {
  return useQuery({
    queryKey: ['packageResInfo', packageId],
    queryFn: () => getPackageResInfo(packageId),
    refetchOnWindowFocus: true,
  });
};
