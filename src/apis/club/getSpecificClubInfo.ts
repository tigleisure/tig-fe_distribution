import { useQuery } from '@tanstack/react-query';
import { instance } from '@apis/instance';
import { clubInfoProps } from 'types/all/ClubInfoTypes';
import { getSpecificClubInfoPayload } from 'types/payload/payload';



interface SpecificClubInfoResponse {
  result: clubInfoProps;
  resultCode: number;
  resultMsg: string;
}

export const getSpecificClubInfo = async (
  clubId: string
): Promise<SpecificClubInfoResponse> => {
  return instance.get(`/api/v1/club/guest/${clubId}`);
};

export const useGetSpecificClubInfo = (clubId: string) => {
  return useQuery({
    queryKey: ['specificClubInfo', clubId],
    queryFn: () => getSpecificClubInfo(clubId),
  });
};
