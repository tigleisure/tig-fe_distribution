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

export interface ReservationCommonInfoProps
  extends Omit<HistoryInProgressItemProps, 'reservationStatus'> {}
