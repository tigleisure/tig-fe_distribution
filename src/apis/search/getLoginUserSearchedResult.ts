import { instance } from '@apis/instance';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { ResultCardProps } from 'types/search/result/searchResult';

export interface SearchResearchResponse {
  result: {
    searchList: ResultCardProps[];
    avgLatitude: number;
    avgLongitude: number;
    isResult: boolean;
  };
  resultCode: number;
  resultMsg: string;
}

export const getLoginUserSearchedResult = async (
  search: string,
  isKeyword: string
): Promise<SearchResearchResponse> => {
  return instance.get(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/search/user?search=${search}&isKeyword=${isKeyword}`
  );
};

export const useGetLoginUserSearchedResult = (
  search: string,
  isKeyword: string
) => {
  return useSuspenseQuery({
    queryKey: ['loginUserSearchedResult', search], // search를 queryKey에 포함
    queryFn: () => getLoginUserSearchedResult(search, isKeyword),
    refetchOnMount: 'always',
  });
};
