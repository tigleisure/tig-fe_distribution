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
  reservationStatus: 'inProgress' | 'confirmed';
  reservationId: number;
}

export interface HistoryComponentUpperSectionProps
  extends Omit<
    HistoryInProgressItemProps,
    'reservationStatus' | 'reservationId'
  > {
  className?: string;
}

export interface HistoryEndItemProps
  extends Omit<HistoryInProgressItemProps, 'reservationStatus'> {
  closedReservationStatus:
    | 'alreadyReviewed'
    | 'notYetReviewed'
    | 'canceled'
    | 'denied';
  reviewId?: number;
}
