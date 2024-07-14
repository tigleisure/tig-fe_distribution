import HistoryComponentUpperSection from '@components/reservation-list/all/HistoryComponentUpperSection';
import ReservationInfoSection from './ReservationInfoSection';
import PaymentInfoSection from './PaymentInfoSection';
import PriceInfoSection from './PriceInfoSection';
import TotalPriceSection from './TotalPriceSection';
import ReservationCancelSection from './ReservationCancelSection';
import { ReservationDetailProps } from 'types/reservation-list/reservation/ReservationDetailType';

export default function HistoryDetail({
  imageUrl,
  clubName,
  clubAddress,
  eventDate,
  eventStartTime,
  eventEndTime,
  adultCount,
  teenagerCount,
  kidsCount,
  reservationNumber,
  reservationUserName,
  phoneNumber,
  paymentTime,
  payMethod,
  reservationPrice,
  feePrice,
  couponDiscountPrice,
  cancelAvailableDate,
}: ReservationDetailProps) {
  return (
    <div className="mt-[20px] mb-[80px] p-5 rounded-[10px] w-eightNineWidth h-fit flex flex-col items-center gap-y-[60px] bg-white shadow-myPageLogoutButton">
      <HistoryComponentUpperSection
        clubName={clubName}
        clubAddress={clubAddress}
        eventDate={eventDate}
        eventStartTime={eventStartTime}
        eventEndTime={eventEndTime}
        adultCount={adultCount}
        teenagerCount={teenagerCount}
        kidsCount={kidsCount}
      />
      <div className="w-full border-[1px] border-grey2" />
      <ReservationInfoSection
        reservationNumber={reservationNumber}
        reservationUserName={reservationUserName}
        phoneNumber={phoneNumber}
      />
      <div className="w-full border-[1px] border-grey2" />
      <PaymentInfoSection paymentTime={paymentTime} payMethod={payMethod} />
      <div className="w-full border-[1px] border-grey2" />
      <PriceInfoSection
        reservationPrice={reservationPrice}
        feePrice={feePrice}
        couponDiscountPrice={couponDiscountPrice}
      />
      <div className="w-full border-[1px] border-grey2" />
      <TotalPriceSection
        totalPrice={reservationPrice + feePrice - couponDiscountPrice}
      />
      <div className="w-sevenEightWidth border-[1px] border-grey2" />
      <ReservationCancelSection cancelAvailableDate={cancelAvailableDate} />
    </div>
  );
}
