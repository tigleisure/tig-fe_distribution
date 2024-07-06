export interface HistoryInProgressItemProps {
  imageUrl?: string;
  companyName: string;
  companyAddress: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  adultCount?: number;
  youngManCount?: number;
  kidCount?: number;
  reservationStatus: 'inProgress' | 'canceled' | 'confirmed' | 'denied';
}

export interface HistoryComponentUpperSectionProps
  extends Omit<HistoryInProgressItemProps, 'reservationStatus'> {
  className?: string;
}

export interface HistoryEndItemProps
  extends Omit<HistoryInProgressItemProps, 'reservationStatus'> {
  isReviewed: boolean;
}
