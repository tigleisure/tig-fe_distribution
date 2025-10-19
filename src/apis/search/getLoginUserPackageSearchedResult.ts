import { instance } from '@apis/instance';
import { useSuspenseQuery } from '@tanstack/react-query';
import { SearchResearchResponse } from './getLoginUserSearchedResult';

export const getLoginUserPackageSearchedResult = async (
  search: string,
  isKeyword: string
): Promise<SearchResearchResponse> => {
  return instance.get(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/search/package/user?search=${search}&isKeyword=${isKeyword}`
  );
};

export const useGetLoginUserPackageSearchedResult = (
  search: string,
  isKeyword: string
) => {
  return useSuspenseQuery({
    queryKey: ['loginUserPackageSearchedResult', search],
    queryFn: () => getLoginUserPackageSearchedResult(search, isKeyword),
    refetchOnMount: 'always',
  });
};


