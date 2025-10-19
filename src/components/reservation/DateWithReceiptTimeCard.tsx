import InfoCard from '@components/all/InfoCard';
import DateTimePicker from './DateTimePicker';
import DateTimePickerModal from './DateTimePickerModal';
import { useState, useEffect } from 'react';
import { formatDateKor, formatTime } from '@utils/formatDate';
import { useSelectedDate } from '@store/selectedDateStore';
import { useGameReservationStore } from '@store/makeReservationInfo';
import { formatDate } from 'date-fns';

export default function DateWithReceiptTimeCard() {
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [receiptDate, setReceiptDate] = useState<Date | null>(null);
  const [receiptTime, setReceiptTime] = useState<string>('');

  const selectedDateStr = useSelectedDate((state) => state.selectedDate);
  const selectedDate = selectedDateStr ? new Date(selectedDateStr) : null;

  // 전역 상태에서 수령 정보 가져오기
  const gameReservationInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const setGameReservationInfo = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );

  // 전역 상태와 로컬 상태 동기화
  useEffect(() => {
    if (gameReservationInfo.receiptDate) {
      const date = new Date(gameReservationInfo.receiptDate);
      setReceiptDate(date);
      // 시간 정보가 있으면 추출
      if (gameReservationInfo.receiptDate.includes('T')) {
        const timePart = gameReservationInfo.receiptDate.split('T')[1];
        if (timePart) {
          setReceiptTime(timePart.substring(0, 5)); // HH:mm 형식으로 추출
        }
      }
    }
  }, [gameReservationInfo.receiptDate]);

  return (
    <section className="w-full flex flex-col p-5 mt-[68px] border-b border-grey2">
      <InfoCard number={1} content="날짜와 수령 시간을 입력해주세요." />
      <DateTimePicker
        label="수령"
        date={receiptDate}
        time={receiptTime}
        onDateClick={() => setOpen(true)}
        onTimeClick={() => setOpenTime(true)}
        formatDate={formatDateKor}
        formatTime={formatTime}
      />

      <DateTimePickerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          setReceiptDate(selectedDate);
          if (selectedDate) {
            // 기존 시간 정보가 있으면 유지, 없으면 기본값 설정
            const existingTime = receiptTime || '00:00';
            const dateTimeString =
              formatDate(selectedDate, 'yyyy-MM-dd') +
              'T' +
              existingTime +
              ':00';
            setGameReservationInfo({
              ...gameReservationInfo,
              receiptDate: dateTimeString,
            });
          }
          setOpen(false);
        }}
        type="date"
      />

      <DateTimePickerModal
        isOpen={openTime}
        onClose={() => setOpenTime(false)}
        onConfirm={() => setOpenTime(false)}
        type="time"
        onTimeSelect={(time) => {
          setReceiptTime(time);
          // 날짜 정보가 있으면 날짜와 시간을 결합하여 저장
          if (receiptDate) {
            const dateTimeString =
              formatDate(receiptDate, 'yyyy-MM-dd') + 'T' + time + ':00';
            setGameReservationInfo({
              ...gameReservationInfo,
              receiptDate: dateTimeString,
            });
          }
        }}
      />
    </section>
  );
}
