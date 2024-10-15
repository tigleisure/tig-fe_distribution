import { instance } from '@apis/instance';
import { useMutation } from '@tanstack/react-query';
import { PostHomePayload } from 'types/payload/payload';
import { PostHomeResponse } from 'types/response/response';

export const postHomeForLogin = async (
  payload: PostHomePayload
): Promise<PostHomeResponse> => {
  return instance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/club/user/home`,
    payload
  );
};

export const usePostHomeForLogin = () => {
  return useMutation({ mutationFn: postHomeForLogin });
};
