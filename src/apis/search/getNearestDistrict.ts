import { instance } from '@apis/instance';
import { useMutation } from '@tanstack/react-query';

interface nearestDisctrictReponse {
  result: {
    nearestDistrict: string;
  };
  resultCode: number;
  resultMsg: string;
}

interface userPositionInfo {
  latitude: number;
  longitude: number;
}

export const getUserNearestDistrict = async (
  positionInfo: userPositionInfo
): Promise<nearestDisctrictReponse> => {
  return await instance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/club/nearest-district`,
    positionInfo
  );
};

export const useGetUserNearestDistrict = () => {
  return useMutation({
    mutationFn: getUserNearestDistrict,
  });
};
