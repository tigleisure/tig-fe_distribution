import { create } from 'zustand';

interface Store {
  selectedIsSearchModalOpen: boolean;
  setSelectedIsSearchModalOpen: (status: boolean) => void;
}

const useSearchModal = create<Store>((set) => ({
  selectedIsSearchModalOpen: false,
  setSelectedIsSearchModalOpen: (status) =>
    set({ selectedIsSearchModalOpen: status }),
}));

export default useSearchModal;
