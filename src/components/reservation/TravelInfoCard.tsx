import InfoCard from '@components/all/InfoCard';
import { useState, useEffect } from 'react';
import { useSelectedDate } from '@store/selectedDateStore';
import { useGameReservationStore } from '@store/makeReservationInfo';
import DateTimePicker from './DateTimePicker';
import DateTimePickerModal from './DateTimePickerModal';
import { formatDateKor, formatTime } from '@utils/formatDate';
import { formatDate } from 'date-fns';

type TravelType = '왕복' | '편도';

interface TravelInfoCardProps {
  travelType: TravelType;
}

export default function TravelInfoCard({ travelType }: TravelInfoCardProps) {
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);
  const [openReturnTime, setOpenReturnTime] = useState(false);

  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [departureTime, setDepartureTime] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [returnTime, setReturnTime] = useState<string | null>(null);

  const selectedDateStr = useSelectedDate((state) => state.selectedDate);
  const selectedDate = selectedDateStr ? new Date(selectedDateStr) : null;

  // 전역 상태에서 여행 정보 가져오기
  const gameReservationInfo = useGameReservationStore(
    (state) => state.gameReservationInfo
  );
  const setGameReservationInfo = useGameReservationStore(
    (state) => state.setGameReservationInfo
  );

  // 전역 상태에서 출발지, 도착지 가져오기
  const [departurePlace, setDeparturePlace] = useState<string>(
    gameReservationInfo.departurePlace || ''
  );
  const [returnPlace, setReturnPlace] = useState<string>(
    gameReservationInfo.returnPlace || ''
  );

  // 전역 상태와 로컬 상태 동기화
  useEffect(() => {
    if (gameReservationInfo.departureDate) {
      setDepartureDate(new Date(gameReservationInfo.departureDate));
    }
    if (gameReservationInfo.returnDate) {
      setReturnDate(new Date(gameReservationInfo.returnDate));
    }
    setDeparturePlace(gameReservationInfo.departurePlace || '');
    setReturnPlace(gameReservationInfo.returnPlace || '');
  }, [
    gameReservationInfo.departureDate,
    gameReservationInfo.returnDate,
    gameReservationInfo.departurePlace,
    gameReservationInfo.returnPlace,
  ]);

  return (
    <section className="w-full flex flex-col p-5 mt-5 border-b border-grey2">
      <InfoCard number={2} content="여행 정보를 입력해주세요." />
      {/* 출발지, 도착지 */}

      <div className="flex gap-2 mt-6">
        <div className="w-full flex flex-col gap-3">
          <p className="title2 text-grey7">출발지</p>
          <input
            className="w-full py-5 px-4 rounded-[12px] border-[1px] body1 grey7 cursor-pointer border-grey3 focus:border-primary_orange1"
            placeholder="출발지 입력"
            value={departurePlace}
            onChange={(e) => {
              setDeparturePlace(e.target.value);
              setGameReservationInfo({
                ...gameReservationInfo,
                departurePlace: e.target.value,
              });
            }}
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <p className="title2 text-grey7">도착지</p>
          <input
            className="w-full py-5 px-4 rounded-[12px] border-[1px] body1 grey7 cursor-pointer border-grey3 focus:border-primary_orange1"
            placeholder="도착지 입력"
            value={returnPlace}
            onChange={(e) => {
              setReturnPlace(e.target.value);
              setGameReservationInfo({
                ...gameReservationInfo,
                returnPlace: e.target.value,
              });
            }}
          />
        </div>
      </div>

      <DateTimePicker
        label="가는"
        date={departureDate}
        time={departureTime}
        onDateClick={() => setOpen(true)}
        onTimeClick={() => setOpenTime(true)}
        formatDate={formatDateKor}
        formatTime={formatTime}
      />

      {travelType === '왕복' && (
        <DateTimePicker
          label="오는"
          date={returnDate}
          time={returnTime}
          onDateClick={() => setOpenReturn(true)}
          onTimeClick={() => setOpenReturnTime(true)}
          formatDate={formatDateKor}
          formatTime={formatTime}
        />
      )}

      {/* 가는 날 날짜 선택 모달 */}
      <DateTimePickerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          setDepartureDate(selectedDate);
          if (selectedDate) {
            setGameReservationInfo({
              ...gameReservationInfo,
              departureDate: formatDate(selectedDate, 'yyyy-MM-dd'),
            });
          }
          setOpen(false);
        }}
        type="date"
      />

      {/* 가는 날 시간 선택 모달 */}
      <DateTimePickerModal
        isOpen={openTime}
        onClose={() => setOpenTime(false)}
        onConfirm={() => setOpenTime(false)}
        type="time"
        onTimeSelect={(time) => {
          setDepartureTime(time);
          // 시간 정보는 departureDate에 포함되어야 하므로, 날짜와 시간을 결합
          if (departureDate && time) {
            const dateTimeString =
              formatDate(departureDate, 'yyyy-MM-dd') + 'T' + time;
            setGameReservationInfo({
              ...gameReservationInfo,
              departureDate: dateTimeString,
            });
          }
        }}
      />

      {/* 오는 날 날짜 선택 모달 */}
      {travelType === '왕복' && (
        <DateTimePickerModal
          isOpen={openReturn}
          onClose={() => setOpenReturn(false)}
          onConfirm={() => {
            setReturnDate(selectedDate);
            if (selectedDate) {
              setGameReservationInfo({
                ...gameReservationInfo,
                returnDate: formatDate(selectedDate, 'yyyy-MM-dd'),
              });
            }
            setOpenReturn(false);
          }}
          type="date"
        />
      )}

      {/* 오는 날 시간 선택 모달 */}
      {travelType === '왕복' && (
        <DateTimePickerModal
          isOpen={openReturnTime}
          onClose={() => setOpenReturnTime(false)}
          onConfirm={() => setOpenReturnTime(false)}
          type="time"
          onTimeSelect={(time) => {
            setReturnTime(time);
            // 시간 정보는 returnDate에 포함되어야 하므로, 날짜와 시간을 결합
            if (returnDate && time) {
              const dateTimeString =
                formatDate(returnDate, 'yyyy-MM-dd') + 'T' + time;
              setGameReservationInfo({
                ...gameReservationInfo,
                returnDate: dateTimeString,
              });
            }
          }}
        />
      )}
    </section>
  );
}
