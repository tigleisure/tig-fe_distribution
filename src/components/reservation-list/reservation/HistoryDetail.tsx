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
  date,
  startTime,
  endTime,
  gameCount,
  adultCount,
  teenagerCount,
  kidsCount,
  reservationId,
  memberName,
  phoneNumber,
  paymentTime,
  payMethod,
  price,
  feePrice,
  couponDiscountPrice,
  cancelAvailableDate,
  status,
  paymentId,
}: ReservationDetailProps) {
  return (
    <div className="mt-[20px] mb-[80px] p-5 rounded-[10px] w-eightNineWidth h-fit flex flex-col items-center gap-y-[30px] bg-white shadow-myPageLogoutButton">
      <HistoryComponentUpperSection
        clubName={clubName}
        clubAddress={clubAddress}
        eventDate={date}
        eventStartTime={startTime}
        eventEndTime={endTime}
        gameCount={gameCount}
        adultCount={adultCount}
        teenagerCount={teenagerCount}
        kidsCount={kidsCount}
      />
      <div className="w-full border-[1px] border-grey2" />
      <ReservationInfoSection
        reservationId={reservationId}
        reservationUserName={memberName}
        phoneNumber={phoneNumber}
      />
      <div className="w-full border-[1px] border-grey2" />
      <PaymentInfoSection paymentTime={paymentTime} payMethod={payMethod} />
      <div className="w-full border-[1px] border-grey2" />
      <PriceInfoSection
        reservationPrice={price}
        feePrice={feePrice}
        couponDiscountPrice={couponDiscountPrice}
      />
      <div className="w-full border-[1px] border-grey2" />
      <TotalPriceSection totalPrice={price + feePrice - couponDiscountPrice} />
      <div className="w-full border-[1px] border-grey2" />
      <ReservationCancelSection
        cancelAvailableDate={cancelAvailableDate}
        status={status}
        paymentId={paymentId}
      />
    </div>
  );
}
