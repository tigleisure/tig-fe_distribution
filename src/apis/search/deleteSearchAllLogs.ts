import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserInfoResponse } from 'types/response/response';

const deleteSearchAllLogs = async (): Promise<UserInfoResponse> => {
  return instance.delete(`/api/v1/search/logs/all`);
};

export const useDeleteSearchAllLogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSearchAllLogs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentSearch'] });
    },
  });
};
