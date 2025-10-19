import Calender from '@components/search/Calender';
import TimePickerCard from '@components/search/TimePickerCard';

interface DateTimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'date' | 'time';
  onTimeSelect?: (time: string) => void;
}

export default function DateTimePickerModal({
  isOpen,
  onClose,
  onConfirm,
  type,
  onTimeSelect,
}: DateTimePickerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl p-6 w-[340px] shadow-lg flex flex-col items-center">
        {type === 'date' ? (
          <Calender />
        ) : (
          <>
            <div className="mb-2 text-center font-bold text-lg">
              탑승 시간 선택
            </div>
            <TimePickerCard onTimeSelect={onTimeSelect} />
          </>
        )}
        <div className="flex w-full gap-2 mt-4">
          <button
            className="flex-1 py-3 rounded-xl border border-grey3 text-grey7 font-semibold"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="flex-1 py-3 rounded-xl bg-primary_orange1 text-white font-semibold"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
