import { instance } from '@apis/instance';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { PostHomePayload } from 'types/payload/payload';
import { PostHomeResponse } from 'types/response/response';

export const getHomeForLogin = async (
  payload: PostHomePayload
): Promise<PostHomeResponse> => {
  return await instance.get(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/club/user/home?latitude=${payload.latitude}&longitude=${payload.longitude}`
  );
};
