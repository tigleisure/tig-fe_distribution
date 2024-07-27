import { instance } from '@apis/instance';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { ResultCardProps } from 'types/search/result/searchResult';
import { SearchResearchResponse } from './getLoginUserSearchedResult';

export const getUnLoginUserSearchedResult = async (
  search: string
): Promise<SearchResearchResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/search/guest?search=${search}`
  );
  if (!response.ok) {
    throw new Error('Failed to get search result');
  }

  const data = await response.json();
  return data;
};

export const useGetUnLoginUserSearchedResult = (search: string) => {
  return useSuspenseQuery({
    queryKey: ['unLoginUserSearchedResult', search], // search를 queryKey에 포함
    queryFn: ({ queryKey }) => {
      const searchParam = queryKey[1] as string; // search 인수 추출
      return getUnLoginUserSearchedResult(searchParam);
    },
  });
};
