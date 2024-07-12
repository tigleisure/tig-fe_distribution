'use client';
import useReservationStage from '@store/reservationStageStore';
import { cn } from '@utils/cn';

interface ReservationStageBarItemProps {
  stageNumber: number;
  title: string;
}

function ReservationStageBarItem({
  stageNumber,
  title,
}: ReservationStageBarItemProps) {
  const reservationStageState = useReservationStage(
    (state) => state.reservationStage
  );
  return (
    <div className="w-[44px] h-fit flex flex-col items-center gap-y-2">
      <p
        className={cn(
          'w-6 h-6  flex justify-center items-center title4 text-white  rounded-[50%] relative',
          {
            'bg-grey6': stageNumber === reservationStageState,
            'bg-grey3': stageNumber !== reservationStageState,
            'reservation-stage-item': stageNumber === 1 || stageNumber == 2,
          }
        )}
      >
        {stageNumber}
      </p>
      <span
        className={cn('title4', {
          'text-grey6': stageNumber === reservationStageState,
          'text-grey3': stageNumber !== reservationStageState,
        })}
      >
        {title}
      </span>
    </div>
  );
}

export default function ReservationStageBar() {
  return (
    <div className="w-full h-fit pt-[78px] flex justify-center items-center gap-x-5">
      <ReservationStageBarItem stageNumber={1} title="예약 확인" />
      <ReservationStageBarItem stageNumber={2} title="예약 결제" />
      <ReservationStageBarItem stageNumber={3} title="예약 확정" />
    </div>
  );
}
