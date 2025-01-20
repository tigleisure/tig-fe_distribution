import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NoMeaningfulResultResponse } from 'types/response/response';
import { ResultCardProps } from 'types/search/result/searchResult';

export const deleteFromWishList = async (
  clubId: number
): Promise<NoMeaningfulResultResponse> => {
  return instance.delete(`/api/v1/wishlist/${clubId}`);
};

export const useDeleteFromWishList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFromWishList,

    onMutate: async (clubId: number) => {
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });

      // 먼저 해당 아이템의 업데이트 이전 정보를 저장
      const prevWishlist = queryClient.getQueryData<{
        result: ResultCardProps[];
        resultCode: number;
        resultMsg: string;
      }>(['wishlist']);

      if (!prevWishlist) {
        return { prevWishlist: { result: [] } };
      }
      // 새로운 선택지 데이터로 낙관적 업데이트 실시
      const newOption = {
        ...prevWishlist,
        result: prevWishlist.result.filter((item) => item.clubId !== clubId),
      };
      queryClient.setQueryData(['wishlist'], newOption);

      // 실패 시 되돌릴 수 있도록 이전 값을 리턴
      return { prevWishlist };
    },
    // 실패 시 이전 데이터로 복구
    onError: (error, _, context) => {
      // 캐시를 저장된 값으로 롤백
      if (context?.prevWishlist) {
        queryClient.setQueryData(['wishlist'], context.prevWishlist);
      }
      window.console.log('error', error);
    },

    // 실패 성공 여부에 상관없이 해당 쿼리를 무효화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['homeData'] });
    },
  });
};
