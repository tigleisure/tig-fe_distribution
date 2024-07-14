export interface HistoryInProgressItemProps {
  imageUrl?: string;
  companyName: string;
  companyAddress: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  adultCount?: number;
  teenagerCount?: number;
  kidsCount?: number;
  reservationStatus:
    | 'CONFIRMED'
    | 'TBC'
    | 'DECLINED'
    | 'CANCELED'
    | 'DONE'
    | 'REVIEWED';
  reservationId: number;
}

export interface HistoryComponentUpperSectionProps
  extends Omit<
    HistoryInProgressItemProps,
    'reservationStatus' | 'reservationId'
  > {
  className?: string;
}

export interface HistoryEndItemProps extends HistoryInProgressItemProps {
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
  price: number;
  // 아래의 속성은 각각 예약 확정, 예약 진행중, 거절됨, 취소됨, 체험 완료됨(리뷰는 아직), 체험 완료됨(리뷰도 끝남)을 의미
  status: 'CONFIRMED' | 'TBC' | 'DECLINED' | 'CANCELED' | 'DONE' | 'REVIEWED';
  memberId: number;
  clubId: number;
  type: any; // any로 된 것은 추후 수정
  businessHours: any;
  clubName: any;
  clubAddress: any;
}
