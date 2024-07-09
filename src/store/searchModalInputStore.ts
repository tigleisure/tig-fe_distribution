import { create } from 'zustand';

interface Store {
  searchInput: string;
  setSearchInput: (status: string) => void;
}

const useSearchModalInput = create<Store>((set) => ({
  searchInput: '',
  setSearchInput: (status) => set({ searchInput: status }),
}));

export default useSearchModalInput;
