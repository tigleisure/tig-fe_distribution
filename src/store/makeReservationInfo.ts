import { formatDate } from 'date-fns';
import { create } from 'zustand';

interface MakeReservationInfoProps {
  date: string;
  startTime: string | null;
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
  request: string;
  gameDescription: string;
}
export interface MakeGameReservationInfoProps extends MakeReservationInfoProps {
  gameCount: number;
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

export const gameReservationInfoInitialState: MakeGameReservationInfoProps = {
  date: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  startTime: null,
  adultCount: 0,
  teenagerCount: 0,
  kidsCount: 0,
  request: '',
  gameCount: 0,
  gameDescription: '',
};

export const useGameReservationStore = create<GameReservationStore>((set) => ({
  gameReservationInfo: gameReservationInfoInitialState,
  setGameReservationInfo: (info) => set({ gameReservationInfo: info }),
}));

export const timeReservationInfoInitialState = {
  date: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  startTime: null,
  endTime: null,
  adultCount: 0,
  teenagerCount: 0,
  kidsCount: 0,
  request: '',
  gameDescription: '',
};
export const useTimeReservationStore = create<TimeReservationStore>((set) => ({
  timeReservationInfo: timeReservationInfoInitialState,
  setTimeReservationInfo: (info) => set({ timeReservationInfo: info }),
}));
