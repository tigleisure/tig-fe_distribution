import { useMutation } from '@tanstack/react-query';
import { PostHomePayload } from 'types/payload/payload';
import { PostHomeResponse } from 'types/response/response';

export const postHomeForUnlogin = async (
  payload: PostHomePayload
): Promise<PostHomeResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/club/guest/home`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to post home');
  }

  const data: PostHomeResponse = await response.json();
  return data;
};

export const usePostHomeForUnlogin = () => {
  return useMutation({ mutationFn: postHomeForUnlogin });
};
