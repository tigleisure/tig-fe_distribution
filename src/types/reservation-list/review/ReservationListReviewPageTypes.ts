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
  teenagerCount?: number;
  kidsCount?: number;
  rating: number;
  rateContent: string;
  className?: string;
}
