export interface HistoryInProgressItemProps {
  imageUrls?: string[];
  clubName: string;
  clubAddress: string;
  date: string;
  startTime: string;
  endTime: string;
  gameCount: number | null;
  adultCount?: number;
  teenagerCount?: number;
  kidsCount?: number;
  gameDescription: string;
  status: 'CONFIRMED' | 'TBC' | 'DECLINED' | 'CANCELED' | 'DONE' | 'REVIEWED';
  reservationId: number;
  paymentId: string | null;
  handleChangeCancelPaymentId: (paymentId: string) => void;
  handleChangeCancelReservationId: (reservationId: number) => void;
}

export interface HistoryInAdminItemProps
  extends Omit<
    HistoryInProgressItemProps,
    'status' | 'handleChangeCancelPaymentId' | 'handleChangeCancelReservationId'
  > {
  userName: string;
  clubPhoneNumber: string;
}

export interface HistoryComponentUpperSectionProps
  extends Omit<
    HistoryInProgressItemProps,
    | 'status'
    | 'reservationId'
    | 'handleChangeCancelPaymentId'
    | 'paymentId'
    | 'handleChangeCancelReservationId'
  > {
  className?: string;
  onClick?: () => void;
}

export interface HistoryEndItemProps
  extends Omit<
    HistoryInProgressItemProps,
    | 'handleChangeCancelPaymentId'
    | 'paymentId'
    | 'handleChangeCancelReservationId'
  > {
  reviewId?: number;
}

// Omit<HistoryInProgressItemProps, 'reservationStatus'> {
//   closedReservationStatus:
//     | 'alreadyReviewed'
//     | 'notYetReviewed'
//     | 'canceled'
//     | 'denied';

export interface ReservationItemProps {
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
  memberName?: string;
  reviewId: number;
  message: string;
  imageUrls: string[];
  gameDescription: string;
  couponId: number;
}
