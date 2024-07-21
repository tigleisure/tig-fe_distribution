export interface ReservationDetailProps {
  imageUrl?: string;
  clubName: string;
  clubAddress: string;
  date: string;
  startTime: string;
  endTime: string;
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
  reservationId: string;
  memberName: string;
  phoneNumber: string;
  paymentTime: string;
  payMethod: string;
  price: number;
  feePrice: number;
  couponDiscountPrice: number;
  cancelAvailableDate: string;
  status: 'TBC' | 'CONFIRMED' | 'DECLINED' | 'CANCELED' | 'REVIEWED' | 'DONE';
}
