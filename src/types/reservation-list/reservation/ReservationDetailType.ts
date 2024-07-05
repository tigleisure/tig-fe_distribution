export interface ReservationDetailProps {
  imageUrl?: string;
  companyName: string;
  companyAddress: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  adultCount?: number;
  youngManCount?: number;
  kidCount?: number;
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
