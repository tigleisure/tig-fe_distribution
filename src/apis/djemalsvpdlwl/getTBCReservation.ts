import { instance } from '@apis/instance';
import { useQuery } from '@tanstack/react-query';

export interface TBCReservationItemProps {
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
  date: string;
  startTime: string;
  endTime: string;
  gameCount: number | null;
  price: number;
  // 아래의 속성은 각각 예약 확정, 예약 진행중, 거절됨, 취소됨, 체험 완료됨(리뷰는 아직), 체험 완료됨(리뷰도 끝남)을 의미
  status: 'CONFIRMED' | 'TBC' | 'DECLINED' | 'CANCELED' | 'DONE' | 'REVIEWED';
  memberId: number | null;
  clubId: number | null;
  type: any; // any로 된 것은 추후 수정
  businessHours: any;
  clubName: string;
  clubAddress: string;
  reservationId: number;
  paymentId: string;
  clubPhoneNumber: string;
  reviewId: number;
  userName: string;
  gameDescription: string;
}
export interface TBCReservationListResponse {
  result: TBCReservationItemProps[];
  resultCode: number;
  resultMsg: string;
}

export const getTBCReservationList =
  async (): Promise<TBCReservationListResponse> => {
    // TBC reservation list
    return instance.get(`/api/v1/reservation/tbc`);
  };

export const useGetTBCReservationList = () => {
  return useQuery({
    queryKey: ['TBCReservation'],
    queryFn: getTBCReservationList,
  });
};
