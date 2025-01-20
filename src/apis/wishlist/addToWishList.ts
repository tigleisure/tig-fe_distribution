import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NoMeaningfulResultResponse } from 'types/response/response';
import { ResultCardProps } from 'types/search/result/searchResult';

// 서버에 위시리스트 추가 요청
export const addToWishList = async (
  clubId: number
): Promise<NoMeaningfulResultResponse> => {
  return instance.post(`/api/v1/wishlist/${clubId}`);
};

export const useAddToWishList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToWishList,

    // 낙관적 업데이트
    onMutate: async (clubId: number) => {
      // 기존 쿼리들 취소(중복 업데이트 방지)
      await queryClient.cancelQueries({ queryKey: ['homeData'] });

      // 현재 캐시된 데이터 백업
      const previousHomeData = queryClient.getQueryData<{
        clubs: ResultCardProps[];
      }>(['homeData']);

      // 2) 홈 데이터 낙관적 업데이트
      queryClient.setQueryData(['homeData'], (old: any) => {
        if (!old?.clubs) return old;
        return {
          ...old,
          clubs: old.clubs.map((club: ResultCardProps) =>
            club.clubId === clubId ? { ...club, isWished: true } : club
          ),
        };
      });

      // 에러 발생 시 복구할 수 있도록 이전 상태 반환
      return { previousHomeData };
    },

    // 에러 시, 낙관적 업데이트 롤백
    onError: (_error, _vars, context) => {
      if (context) {
        queryClient.setQueryData(['homeData'], context.previousHomeData);
      }
    },

    // 완료 시(성공/실패 불문) 캐시 무효화
    onSettled: () => {
      console.log('onSettled');
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['homeData'] });
    },
  });
};
