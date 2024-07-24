import { create } from 'zustand';

interface Store {
  filterOption: string;
  setFilterOption: (option: string) => void;
}

export const useFilterOptionStore = create<Store>((set) => ({
  filterOption: '추천순',
  setFilterOption: (option) => set({ filterOption: option }),
}));
