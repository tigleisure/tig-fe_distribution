import { instance } from '@apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteFromWishListResponse } from 'types/response/response';

export const deleteFromWishList = async (
  clubId: number
): Promise<DeleteFromWishListResponse> => {
  return instance.delete(`/api/v1/wishlist/${clubId}`);
};

export const useDeleteFromWishList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFromWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};
