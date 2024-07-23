import { useQuery } from '@tanstack/react-query';
import { instance } from '@apis/instance';

interface clubInfoProps {
  id: number;
  clubName: string;
  address: string;
  ratingSum: number;
  ratingCount: number;
  avgRating: number;
  price: number;
  phonenumber: string;
  snsLink: string;
  businessHour: string;
  latitude: number;
  longitude: number;
  category: string;
  type: 'GAME' | 'TIME';
  imageUrls: string[];
  presignedImageUrls: string[];
}

interface SpecificClubInfoResponse {
  result: clubInfoProps;
  resultCode: number;
  resultMsg: string;
}

export const getSpecificClubInfo = async (
  clubId: number
): Promise<SpecificClubInfoResponse> => {
  return instance.get(`/api/v1/club/${clubId}`);
};

export const useGetSpecificClubInfo = (clubId: number) => {
  return useQuery({
    queryKey: ['specificClubInfo', clubId],
    queryFn: () => getSpecificClubInfo(clubId),
  });
};
