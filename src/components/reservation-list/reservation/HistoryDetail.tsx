import ReservationInfoSection from './ReservationInfoSection';
import PaymentInfoSection from './PaymentInfoSection';
import PriceInfoSection from './PriceInfoSection';
import TotalPriceSection from './TotalPriceSection';
import ReservationCancelSection from './ReservationCancelSection';
import { ReservationDetailProps } from 'types/reservation-list/reservation/ReservationDetailType';
import RequestMessageSection from './RequestMessageSection';
import { useRouter } from 'next/navigation';
import { formatDate } from 'date-fns';
import HistoryComponentUpperSection from '@components/all/HistoryComponentUpperSection';

export default function HistoryDetail({
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
  userName,
  phoneNumber,
  updatedAt: paymentTime,
  provider: payMethod,
  price,
  feePrice,
  couponDiscountPrice,
  status,
  paymentId,
  message,
  clubId,
  imageUrls,
  gameDescription,
}: ReservationDetailProps) {
  const router = useRouter();
  return (
    <div className="mt-[20px] mb-[80px] p-5 rounded-[10px] w-eightNineWidth h-fit flex flex-col items-center gap-y-[30px] bg-white shadow-myPageLogoutButton">
      <HistoryComponentUpperSection
        clubName={clubName}
        clubAddress={clubAddress}
        date={date}
        startTime={startTime}
        endTime={endTime}
        gameCount={gameCount}
        adultCount={adultCount}
        teenagerCount={teenagerCount}
        kidsCount={kidsCount}
        imageUrls={imageUrls}
        gameDescription={gameDescription}
        onClick={() => {
          router.push(
            `/detail-page/${clubId}?date=${formatDate(
              new Date(),
              "yyyy-MM-dd'T'HH:mm:ss"
            )}`
          );
        }}
      />
      <div className="w-full border-[1px] border-grey2" />
      <ReservationInfoSection
        reservationId={reservationId}
        reservationUserName={userName}
        phoneNumber={phoneNumber}
      />
      <div className="w-full border-[1px] border-grey2" />
      <PaymentInfoSection paymentTime={paymentTime} payMethod={payMethod} />
      <div className="w-full border-[1px] border-grey2" />
      <PriceInfoSection
        reservationPrice={
          (Number(price) + Number(couponDiscountPrice)) * (10 / 11)
        }
        feePrice={(Number(price) + Number(couponDiscountPrice)) * (1 / 11)}
        couponDiscountPrice={couponDiscountPrice}
      />
      <div className="w-full border-[1px] border-grey2" />
      <TotalPriceSection totalPrice={price} />
      <div className="w-full border-[1px] border-grey2" />
      <RequestMessageSection message={message} />
      <div className="w-full border-[1px] border-grey2" />
      <ReservationCancelSection
        cancelAvailableDate={startTime}
        status={status}
        paymentId={paymentId}
      />
    </div>
  );
}
