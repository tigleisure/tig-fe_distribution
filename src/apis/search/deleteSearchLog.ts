import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserInfoResponse } from 'types/response/response';

const deleteSearchLog = async (log: string): Promise<UserInfoResponse> => {
  return instance.delete(`/api/v1/search/logs?target=${log}`);
};

export const useDeleteSearchLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSearchLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentSearch'] });
    },
  });
};
