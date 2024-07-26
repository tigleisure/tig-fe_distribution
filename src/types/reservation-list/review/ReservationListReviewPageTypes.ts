import { HistoryComponentUpperSectionProps } from 'types/reservation-list/ReservationListPageTypes';

export interface ReviewProps extends HistoryComponentUpperSectionProps {
  reservationUserName: string;
  rating: number;
  rateContent: string;
}

export interface ReviewLowerSectionProps {
  rating: number;
  contents: string;
  userName: string;
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
  startTime: string;
  className?: string;
}
