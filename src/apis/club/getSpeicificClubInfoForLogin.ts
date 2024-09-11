import { useQuery } from '@tanstack/react-query';
import { instance } from '@apis/instance';
import { clubInfoProps } from 'types/all/ClubInfoTypes';

interface SpecificClubInfoResponse {
  result: clubInfoProps;
  resultCode: number;
  resultMsg: string;
}

export const getSpecificClubInfoForLogin = async (
  clubId: string
): Promise<SpecificClubInfoResponse> => {
  return instance.get(`/api/v1/club/user/${clubId}`);
};

export const useGetSpecificClubInfoForLogin = (clubId: string) => {
  return useQuery({
    queryKey: ['specificClubInfoForLogin', clubId],
    queryFn: () => getSpecificClubInfoForLogin(clubId),
    refetchOnMount: 'always',
  });
};
