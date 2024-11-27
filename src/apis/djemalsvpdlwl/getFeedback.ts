import { instance } from '@apis/instance';
import { useQuery } from '@tanstack/react-query';
import { FeedbackListResponse } from 'types/response/response';

export const getFeedbacklist = async (): Promise<FeedbackListResponse> => {
  return instance.get(`/api/v1/feedback`);
};

export const useGetFeedbacklist = () => {
  return useQuery({
    queryKey: ['feedback'],
    queryFn: getFeedbacklist,
  });
};
