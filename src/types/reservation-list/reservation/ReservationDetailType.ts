export interface ReservationDetailProps {
  imageUrl?: string;
  clubName: string;
  clubAddress: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  adultCount?: number;
  teenagerCount?: number;
  kidsCount?: number;
  reservationNumber: string;
  reservationUserName: string;
  phoneNumber: string;
  paymentTime: string;
  payMethod: string;
  reservationPrice: number;
  feePrice: number;
  couponDiscountPrice: number;
  cancelAvailableDate: string;
}
