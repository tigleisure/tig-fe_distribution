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
  endDate: string | null;
  travelType: '왕복' | '편도';
  departureDate: string | null;
  returnDate: string | null;
  departurePlace: string | null;
  returnPlace: string | null;
  receiptDate: string | null;
  deliveryAddress: string | null;
}
interface MakeTimeReservationInfoProps extends MakeReservationInfoProps {
  endTime: string | null;
}

interface GameReservationStore {
  gameReservationInfo: MakeGameReservationInfoProps;
  setGameReservationInfo: (
    info:
      | MakeGameReservationInfoProps
      | ((prev: MakeGameReservationInfoProps) => MakeGameReservationInfoProps)
  ) => void;
}

interface TimeReservationStore {
  timeReservationInfo: MakeTimeReservationInfoProps;
  setTimeReservationInfo: (
    info:
      | MakeTimeReservationInfoProps
      | ((prev: MakeTimeReservationInfoProps) => MakeTimeReservationInfoProps)
  ) => void;
}

export const gameReservationInfoInitialState: MakeGameReservationInfoProps = {
  date: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  endDate: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  startTime: null,
  adultCount: 1,
  teenagerCount: 0,
  kidsCount: 0,
  request: '',
  gameCount: 0,
  gameDescription: '',
  travelType: '왕복',
  departureDate: null,
  returnDate: null,
  departurePlace: null,
  returnPlace: null,
  receiptDate: null,
  deliveryAddress: null,
};

export const useGameReservationStore = create<GameReservationStore>((set) => ({
  gameReservationInfo: gameReservationInfoInitialState,
  setGameReservationInfo: (info) =>
    set((state) => ({
      gameReservationInfo:
        typeof info === 'function' ? info(state.gameReservationInfo) : info,
    })),
}));

export const timeReservationInfoInitialState = {
  date: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  endDate: null,
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
  setTimeReservationInfo: (info) =>
    set((state) => ({
      timeReservationInfo:
        typeof info === 'function' ? info(state.timeReservationInfo) : info,
    })),
}));
