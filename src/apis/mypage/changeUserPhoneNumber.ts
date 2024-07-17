import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserInfoResponse } from 'types/response/response';

const changeUserPhoneNumber = async ({
  phoneNumber,
}: {
  phoneNumber: string;
}): Promise<UserInfoResponse> => {
  return instance.patch(
    `/api/v1/member/phoneNumber?newPhoneNumber=${phoneNumber}`
  );
};

export const useChangeUserPhoneNumber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeUserPhoneNumber,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
