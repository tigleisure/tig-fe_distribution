import { formatDate } from 'date-fns';
import { create } from 'zustand';

interface Store {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export const useSelectedDate = create<Store>((set) => ({
  selectedDate: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
