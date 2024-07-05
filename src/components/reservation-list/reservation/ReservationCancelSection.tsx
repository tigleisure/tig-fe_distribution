interface ReservationCancelProps {
  cancelAvailableDate: string;
}

export default function ReservationCancelSection({
  cancelAvailableDate,
}: ReservationCancelProps) {
  return (
    <section className="w-sevenEightWidth h-fit flex flex-col items-start gap-y-5 ">
      <div className="flex flex-col w-full items-start gap-y-[10px]">
        <span className="title3 text-grey7">예약 취소</span>
        <span className="caption4 text-grey4">
          {cancelAvailableDate}까지 무료 취소 가능합니다
        </span>
      </div>
      <button className="w-[72px] h-[33px] rounded-[4px] bg-white text-status_red1 body4 shadow-cancelButton">
        예약취소
      </button>
    </section>
  );
}
