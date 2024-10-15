import { instance } from '@apis/instance';
import { useQuery } from '@tanstack/react-query';

interface Result {
  clubName: string;
  address: string;
  price: 0;
  category:
    | 'TENNIS'
    | 'BALLING'
    | 'TABLE_TENNIS'
    | 'GOLF'
    | 'FOOTBALL'
    | 'SQUSH'
    | 'BILLIARDS'
    | 'BASEBALL';
  // 추후 제대로 설정해야 함
  operatingHours: string[];
}

interface GetClubResInfoResponse {
  result: Result;
  resultCode: number;
  resultMsg: string;
}

const getClubResInfo = async (
  clubId: string
): Promise<GetClubResInfoResponse> => {
  return instance.get(`/api/v1/reservation/club/${clubId}`);
};

export const useGetClubResInfo = (clubId: string) => {
  return useQuery({
    queryKey: ['clubResInfo', clubId],
    queryFn: () => getClubResInfo(clubId),
  });
};
