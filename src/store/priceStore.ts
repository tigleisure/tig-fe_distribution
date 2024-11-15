import { create } from 'zustand';

interface Store {
  price: number;
  isFromReservation: boolean;
  setPrice: (value: number) => void;
  setIsFromReservation: (value: boolean) => void;
}

export const usePriceStore = create<Store>((set) => ({
  price: 0,
  isFromReservation: false,
  setPrice: (value) => set({ price: value }),
  setIsFromReservation: (value) => set({ isFromReservation: value }),
}));
