import { formatDate } from 'date-fns';
import { create } from 'zustand';

interface MakeReservationInfoProps {
  date: string;
  startTime: string;
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
  askToManager: string;
}
interface MakeGameReservationInfoProps extends MakeReservationInfoProps {
  gameCount: number;
}
interface MakeTimeReservationInfoProps extends MakeReservationInfoProps {
  endTime: string;
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
    date: formatDate(new Date(), 'yyyy-MM-dd'),
    startTime: '',
    adultCount: 0,
    teenagerCount: 0,
    kidsCount: 0,
    askToManager: '',
    gameCount: 0,
  },
  setGameReservationInfo: (info) => set({ gameReservationInfo: info }),
}));

export const useTimeReservationStore = create<TimeReservationStore>((set) => ({
  timeReservationInfo: {
    date: formatDate(new Date(), 'yyyy-MM-dd'),
    startTime: '',
    endTime: '',
    adultCount: 0,
    teenagerCount: 0,
    kidsCount: 0,
    askToManager: '',
  },
  setTimeReservationInfo: (info) => set({ timeReservationInfo: info }),
}));
