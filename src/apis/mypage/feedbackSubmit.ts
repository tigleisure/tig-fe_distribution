import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserInfoResponse } from 'types/response/response';

const feedbackSubmit = async ({
  message,
}: {
  message: string;
}): Promise<UserInfoResponse> => {
  return instance.post(`/api/v1/member/feedback`, { message });
};

export const useFeedbackSubmit = () => {
  return useMutation({
    mutationFn: feedbackSubmit,
  });
};
