import { cookies } from 'next/headers';

export interface PackagePriceItem {
  id: number;
  optionType: string;
  optionValue: string;
  price: number;
  description: string | null;
  isDefault: boolean;
}

export interface RawPackageDetailResult {
  id: number;
  name: string;
  address: string;
  price: string;
  ratingSum: number;
  ratingCount: number;
  category: string;
  imageUrls: string[] | null;
  presignedImageUrls: string[] | null;
  packagePrices: PackagePriceItem[];
  averageRating: number;
}

export interface PackageDetailResponse {
  result: RawPackageDetailResult;
  resultCode: number;
  resultMsg: string;
}

export const getSpecificPackageInfoForGuest = async (
  id: string
): Promise<PackageDetailResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/club/package/guest/${id}`
  );
  return res.json();
};

export const getSpecificPackageInfoForUser = async (
  id: string
): Promise<PackageDetailResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/club/package/user/${id}`,
    {
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  return res.json();
};
