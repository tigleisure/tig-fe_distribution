import { create } from 'zustand';

interface Store {
  reservationStage: 1 | 2 | 3;
  setReservationStage: (status: 1 | 2 | 3) => void;
}

const useReservationStage = create<Store>((set) => ({
  reservationStage: 1,
  setReservationStage(status) {
    set({ reservationStage: status });
  },
}));

export default useReservationStage;
