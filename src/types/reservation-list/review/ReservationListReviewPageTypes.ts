import { HistoryComponentUpperSectionProps } from 'types/reservation-list/ReservationListPageTypes';

export interface ReviewProps extends HistoryComponentUpperSectionProps {
  reservationUserName: string;
  rating: number;
  rateContent: string;
}

export interface ReviewLowerSectionProps {
  reservationUserName: string;
  eventDate: string;
  adultCount?: number;
  youngManCount?: number;
  kidCount?: number;
  rating: number;
  rateContent: string;
}
