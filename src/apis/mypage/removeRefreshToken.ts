import { instance } from '@apis/instance';
import { NoMeaningfulResultResponse } from 'types/response/response';

export const removeUserRefreshToken =
  async (): Promise<NoMeaningfulResultResponse> => {
    return instance.get(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/member/logout`
    );
  };
