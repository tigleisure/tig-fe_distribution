import { create } from 'zustand';

interface Store {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (value: boolean) => void;
}

export const useBottomSheetStore = create<Store>((set) => ({
  isBottomSheetOpen: true,
  setIsBottomSheetOpen: (value) => set({ isBottomSheetOpen: value }),
}));
