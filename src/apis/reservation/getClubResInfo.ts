import { instance } from '@apis/instance';
import { useQuery } from '@tanstack/react-query';

interface Result {
  clubName: string;
  address: string;
  price: 0;
  businessHours: string;
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
