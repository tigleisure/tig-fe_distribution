import { create } from 'zustand';

interface Store {
  pinCardIndex: number;
  setPinCardIndex: (value: number) => void;
}

export const usePinCardIndexStore = create<Store>((set) => ({
  pinCardIndex: 0,
  setPinCardIndex: (value) => set({ pinCardIndex: value }),
}));
