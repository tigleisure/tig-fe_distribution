import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { instance } from '@apis/instance';
import { clubInfoProps } from 'types/all/ClubInfoTypes';
import { cookies } from 'next/headers';

interface SpecificClubInfoResponse {
  result: clubInfoProps;
  resultCode: number;
  resultMsg: string;
}

export const getSpecificClubInfoForLogin = async (
  clubId: string
): Promise<SpecificClubInfoResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/club/user/${clubId}`,
    {
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  return res.json();
};

export const useGetSpecificClubInfoForLogin = (clubId: string) => {
  return useSuspenseQuery({
    queryKey: ['specificClubInfoForLogin', clubId],
    queryFn: () => getSpecificClubInfoForLogin(clubId),
    refetchOnMount: 'always',
  });
};
