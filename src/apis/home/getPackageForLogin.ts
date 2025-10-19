import { instance } from '@apis/instance';
import { PostHomePayload } from 'types/payload/payload';
import { PostHomeResponse2 } from 'types/response/response';

export const getPackageForLogin = async (
  payload: PostHomePayload
): Promise<PostHomeResponse2> => {
  return await instance.get(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/club/package/user/home?latitude=${payload.latitude}&longitude=${payload.longitude}`
  );
};
