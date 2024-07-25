import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NoMeaningfulResultResponse } from 'types/response/response';
import { ResultCardProps } from 'types/search/result/searchResult';

export const addToWishList = async (
  clubId: number
): Promise<NoMeaningfulResultResponse> => {
  return instance.post(`/api/v1/wishlist/${clubId}`);
};

export const useAddToWishList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },

    // onMutate: async (clubId: number) => {
    //   await queryClient.cancelQueries({ queryKey: ['wishlist'] });

    //   /* 낙관적 업데이트를 위해 검색결과 페이지 API 가 우선적으로 개발되어야 함 */

    //   // 먼저 해당 아이템의 업데이트 이전 정보를 저장

    //   // 새로운 선택지 데이터로 낙관적 업데이트 실시

    //   // 실패 시 되돌릴 수 있도록 이전 값을 리턴
    // },
    // // 실패 시 이전 데이터로 복구
    // onError: (error, _, context) => {
    //   // 캐시를 저장된 값으로 롤백
    // },

    // // 실패 성공 여부에 상관없이 해당 쿼리를 무효화
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    // },
  });
};
