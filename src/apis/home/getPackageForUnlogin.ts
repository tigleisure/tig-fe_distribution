import { PostHomePayload } from 'types/payload/payload';
import { PostHomeResponse2 } from 'types/response/response';

export const getPackageForUnlogin = async (
  payload: PostHomePayload
): Promise<PostHomeResponse2> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/club/package/guest/home?latitude=${payload.latitude}&longitude=${payload.longitude}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to post package home');
  }

  const data: PostHomeResponse2 = await response.json();
  return data;
};
