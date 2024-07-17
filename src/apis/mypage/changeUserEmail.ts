import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserInfoResponse } from 'types/response/response';

const changeUserEmail = async ({
  email,
}: {
  email: string;
}): Promise<UserInfoResponse> => {
  return instance.patch(`/api/v1/member/email?newEmail=${email}`);
};

export const useChangeUserEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeUserEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
