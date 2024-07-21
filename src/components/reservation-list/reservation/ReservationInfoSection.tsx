interface ReservationInfoProps {
  reservationUserName: string;
  reservationId: string;
  phoneNumber: string;
}

export default function ReservationInfoSection({
  reservationId,
  reservationUserName,
  phoneNumber,
}: ReservationInfoProps) {
  return (
    <section className="w-sevenEightWidth h-fit flex flex-col items-start gap-y-5">
      <div className="title3 text-grey7">예약정보</div>
      <div className="flex flex-col gap-y-[14px]">
        <div className="flex items-center gap-x-5">
          <span className="caption2 text-grey4">예약 번호</span>
          <span className="caption2 text-grey6">{reservationId}</span>
        </div>
        <div className="flex items-center gap-x-[33px]">
          <span className="caption2 text-grey4">예약자</span>
          <span className="caption2 text-grey6">{reservationUserName}</span>
        </div>
        <div className="flex items-center gap-x-[33px]">
          <span className="caption2 text-grey4">연락처</span>
          <span className="caption2 text-grey6">{phoneNumber}</span>
        </div>
      </div>
    </section>
  );
}
