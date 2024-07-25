import { instance } from '@apis/instance';
import { useQuery } from '@tanstack/react-query';
import { RecentSearchResponse } from 'types/response/response';

const getRecentSearch = async (): Promise<RecentSearchResponse> => {
  return instance.get('/api/v1/search/logs');
};

export const useGetRecentSearch = () => {
  return useQuery({
    queryKey: ['recentSearch'],
    queryFn: getRecentSearch,
    refetchOnMount: 'always',
  });
};
