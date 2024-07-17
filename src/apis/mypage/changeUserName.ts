import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserInfoResponse } from 'types/response/response';

const changeUserName = async ({
  name,
}: {
  name: string;
}): Promise<UserInfoResponse> => {
  return instance.patch(`/api/v1/member/name?newName=${name}`);
};

export const useChangeUserName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeUserName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
