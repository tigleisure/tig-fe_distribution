import { formatDate } from 'date-fns';
import { create } from 'zustand';

interface MakeReservationInfoProps {
  date: string;
  startTime: string | null;
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
  request: string;
}
interface MakeGameReservationInfoProps extends MakeReservationInfoProps {
  gameCount: number | null;
}
interface MakeTimeReservationInfoProps extends MakeReservationInfoProps {
  endTime: string | null;
}

interface GameReservationStore {
  gameReservationInfo: MakeGameReservationInfoProps;
  setGameReservationInfo: (info: MakeGameReservationInfoProps) => void;
}

interface TimeReservationStore {
  timeReservationInfo: MakeTimeReservationInfoProps;
  setTimeReservationInfo: (info: MakeTimeReservationInfoProps) => void;
}

export const useGameReservationStore = create<GameReservationStore>((set) => ({
  gameReservationInfo: {
    date: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    startTime: null,
    adultCount: 0,
    teenagerCount: 0,
    kidsCount: 0,
    request: '',
    gameCount: null,
  },
  setGameReservationInfo: (info) => set({ gameReservationInfo: info }),
}));

export const useTimeReservationStore = create<TimeReservationStore>((set) => ({
  timeReservationInfo: {
    date: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    startTime: null,
    endTime: null,
    adultCount: 0,
    teenagerCount: 0,
    kidsCount: 0,
    request: '',
  },
  setTimeReservationInfo: (info) => set({ timeReservationInfo: info }),
}));
