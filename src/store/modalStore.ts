import { create } from 'zustand';

interface Store {
  selectedIsReservationModalOpen: boolean;
  setSelectedIsReservationModalOpen: (status: boolean) => void;
}

const useReservationModal = create<Store>((set) => ({
  selectedIsReservationModalOpen: false,
  setSelectedIsReservationModalOpen: (status) =>
    set({ selectedIsReservationModalOpen: status }),
}));

export default useReservationModal;
