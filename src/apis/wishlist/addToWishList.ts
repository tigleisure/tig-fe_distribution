import { instance } from '@apis/instance';
import {
  QueryCache,
  QueryErrorResetBoundary,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  Club,
  NearestClubsByCategory,
  NoMeaningfulResultResponse,
  PostHomeResponse,
} from 'types/response/response';
import { ResultCardProps } from 'types/search/result/searchResult';

// 서버에 위시리스트 추가 요청
export const addToWishList = async (
  clubId: number
): Promise<NoMeaningfulResultResponse> => {
  return instance.post(`/api/v1/wishlist/${clubId}`);
};

export const useAddToWishList = () => {
  const queryClient = useQueryClient();
  const queryCache = new QueryCache();

  return useMutation({
    mutationFn: addToWishList,

    // 낙관적 업데이트
    onMutate: async (clubId: number) => {
      // 기존 쿼리들 취소(중복 업데이트 방지)
      await queryClient.cancelQueries({ queryKey: ['homeData'] });
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });

      // 현재 캐시된 데이터 백업
      const previousHomeData = queryClient.getQueryData<PostHomeResponse>([
        'homeData',
      ]);
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

      if (!previousHomeData?.result[0].nearestClubsByCategory) {
        return { previousHomeData };
      }

      function findClubById(
        nearestClubsByCategory: NearestClubsByCategory,
        id: number
      ): Club | undefined {
        // 모든 카테고리 배열들을 flat으로 합치고, 거기서 find
        return Object.values(nearestClubsByCategory)
          .flat()
          .find((club) => club.clubId === id);
      }

      const newClub = {
        ...findClubById(
          previousHomeData?.result[0].nearestClubsByCategory,
          clubId
        ),
        isWished: true,
      };

      // wishlist 캐시된 데이터 백업
      const prevWishlist = queryClient.getQueryData<{
        result: ResultCardProps[];
        resultCode: number;
        resultMsg: string;
      }>(['wishlist']);

      if (!prevWishlist) {
        return { prevWishlist: { result: [] } };
      }

      const newOption = {
        ...prevWishlist,
        result: [...prevWishlist.result, newClub],
      };
      queryClient.setQueryData(['wishlist'], newOption);

      // 에러 발생 시 복구할 수 있도록 이전 상태 반환
      return { previousHomeData, prevWishlist };
    },

    // 에러 시, 낙관적 업데이트 롤백
    onError: (_error, _vars, context) => {
      if (context) {
        queryClient.setQueryData(['homeData'], context.previousHomeData);
        queryClient.setQueryData(['wishlist'], context.prevWishlist);
      }
    },

    // 완료 시(성공/실패 불문) 캐시 무효화
    onSettled: () => {
      // queryCache.clear();
      // queryClient.refetchQueries({ queryKey: ['wishlist']});

      // queryClient.invalidateQueries({
      //   queryKey: ['wishlist'],
      //   refetchInactive: true,

      // });
      // queryClient.removeQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['homeData'] });
    },
  });
};
