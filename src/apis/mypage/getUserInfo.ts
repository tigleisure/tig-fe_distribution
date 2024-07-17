import { instance } from '@apis/instance';
import { useQuery } from '@tanstack/react-query';
import { UserInfoResponse } from 'types/response/response';

const getUserInfo = async (): Promise<UserInfoResponse> => {
  return instance.get('/api/v1/member/member');
};

export const useGetUserInfo = () => {
  return useQuery({ queryKey: ['userInfo'], queryFn: getUserInfo });
};
