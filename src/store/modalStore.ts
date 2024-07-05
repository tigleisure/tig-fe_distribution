import { create } from 'zustand';

interface Store {
  selectedIsModalOpen: boolean;
  setSelectedIsModalOpen: (status: boolean) => void;
}

const useModal = create<Store>((set) => ({
  selectedIsModalOpen: false,
  setSelectedIsModalOpen: (status) =>
    set({ selectedIsModalOpen: status }),
}));

export default useModal;
