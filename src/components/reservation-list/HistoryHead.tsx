// 해당 컴포넌트는 전체, 진행중, 종료된을 보여주는 UI이기에 내역의 대가리라는 의미에서 Head라고 명명함
'use client';
import { cn } from '@utils/cn';
interface reservationHistoryCountProps {
  totalCount: number;
  inProgressCount: number;
  completedCount: number;
  historyHeadState: string;
  handleHeadState: (st: '전체' | '진행중' | '종료된') => void;
}

interface historyItemProps {
  label: '전체' | '진행중' | '종료된';
  count: number;
  isFocused: boolean;
  handleReservationState: (st: '전체' | '진행중' | '종료된') => void;
}

function HistoryHeadItem({
  label,
  count,
  isFocused,
  handleReservationState,
}: historyItemProps) {
  return (
    <div
      className="w-fit h-4 flex justify-between items-center gap-x-1 hover:cursor-pointer"
      onClick={() => handleReservationState(label)}
    >
      <span
        className={cn('title2', {
          'text-grey7': isFocused,
          'text-grey4': !isFocused,
        })}
      >
        {label}
      </span>
      <span
        className={cn('title2', {
          'text-primary_orange1': isFocused,
          'text-grey4': !isFocused,
        })}
      >
        {count}
      </span>
    </div>
  );
}

export default function HistoryHead({
  totalCount,
  inProgressCount,
  completedCount,
  historyHeadState,
  handleHeadState,
}: reservationHistoryCountProps) {
  // 현재 각 아이템을 클릭하며 테스트하기 위한 용도이고, 추후에 전역 상태로 바뀌어 관련 다른 UI과 조화될 수 있음

  return (
    <div className="w-full h-[49px] px-5 flex justify-start items-center gap-x-5">
      <HistoryHeadItem
        label="전체"
        count={totalCount}
        isFocused={historyHeadState === '전체'}
        handleReservationState={handleHeadState}
      />
      <HistoryHeadItem
        label="진행중"
        count={inProgressCount}
        isFocused={historyHeadState === '진행중'}
        handleReservationState={handleHeadState}
      />
      <HistoryHeadItem
        label="종료된"
        count={completedCount}
        isFocused={historyHeadState === '종료된'}
        handleReservationState={handleHeadState}
      />
    </div>
  );
}
