import { useSuspenseQuery } from '@tanstack/react-query';
import { SearchResearchResponse } from './getLoginUserSearchedResult';

export const getUnLoginUserPackageSearchedResult = async (
  search: string
): Promise<SearchResearchResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/search/package/guest?search=${search}`
  );
  if (!response.ok) {
    throw new Error('Failed to get package search result');
  }
  const data = await response.json();
  return data;
};

export const useGetUnLoginUserPackageSearchedResult = (search: string) => {
  return useSuspenseQuery({
    queryKey: ['unLoginUserPackageSearchedResult', search],
    queryFn: () => getUnLoginUserPackageSearchedResult(search),
  });
};


