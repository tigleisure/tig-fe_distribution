export interface ReservationDetailProps {
  imageUrls?: string[];
  clubName: string;
  clubAddress: string;
  date: string;
  startTime: string;
  endTime: string;
  gameCount: number | null;
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
  reservationId: string;
  userName: string;
  phoneNumber: string;
  updatedAt: string;
  provider: string;
  price: number;
  feePrice: number;
  couponDiscountPrice: number;
  status: 'TBC' | 'CONFIRMED' | 'DECLINED' | 'CANCELED' | 'REVIEWED' | 'DONE';
  paymentId: string;
  message: string;
  clubId: string;
  gameDescription: string;
}
