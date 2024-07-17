import { instance } from '@apis/instance';
import { useMutation } from '@tanstack/react-query';

interface reservationRequestBodyProp {
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  status: 'TBC';
  clubId: number;
}

interface reservationResponseBodyProp {
  result: {
    adultCount: number;
    teenagerCount: number;
    kidsCount: number;
    date: string;
    startTime: string;
    endTime: string;
    price: 30000;
    status: 'TBC';
    memberId: number;
    clubId: number;
    type: 'GAME' | 'TIME';
    businessHours: string;
    clubName: string;
    clubAddress: string;
    reservationId: number;
  };
  resultCode: number;
  resultMsg: string;
}

export const postUserReservation = (
  data: reservationRequestBodyProp
): Promise<reservationResponseBodyProp> => {
  return instance.post(`/api/v1/reservation/${data.clubId}`, data);
};

// 위의 postUserReservation 함수를 주로 쓰고, 아래 것은 크게 쓸일 없을듯?
export const usePostReservation = (postData: reservationRequestBodyProp) => {
  return useMutation({
    mutationFn: () => postUserReservation(postData),
  });
};
