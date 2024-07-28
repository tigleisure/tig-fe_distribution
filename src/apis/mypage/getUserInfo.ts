import { instance } from '@apis/instance';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { UserInfoResponse } from 'types/response/response';

const getUserInfo = async (): Promise<UserInfoResponse> => {
  return instance.get('/api/v1/member/member');
};

export const useGetUserInfo = () => {
  return useSuspenseQuery({ queryKey: ['userInfo'], queryFn: getUserInfo });
};
