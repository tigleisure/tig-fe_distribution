import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { instance } from '@apis/instance';
import { clubInfoProps } from 'types/all/ClubInfoTypes';
import { getSpecificClubInfoPayload } from 'types/payload/payload';

export interface SpecificClubInfoResponse {
  result: clubInfoProps;
  resultCode: number;
  resultMsg: string;
}

export const getSpecificClubInfo = async (
  clubId: string
): Promise<SpecificClubInfoResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/club/guest/${clubId}`
  );
  return res.json();
};

export const useGetSpecificClubInfo = (clubId: string) => {
  return useSuspenseQuery({
    queryKey: ['specificClubInfo', clubId],
    queryFn: () => getSpecificClubInfo(clubId),
  });
};
