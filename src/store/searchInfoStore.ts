import { formatDate } from 'date-fns';
import { create } from 'zustand';

interface SearchInputProps {
  searchValue: string;
  searchDate: string;
  adultCount: number;
  teenagerCount: number;
  kidCount: number;
}

interface Store {
  searchInput: SearchInputProps;
  setSearchInput: (status: SearchInputProps) => void;
}

export const useSearchInputInfo = create<Store>((set) => ({
  searchInput: {
    searchValue: '신촌',
    searchDate: formatDate(new Date(), 'yyyy-MM-dd'),
    adultCount: 1,
    teenagerCount: 0,
    kidCount: 0,
  },
  setSearchInput: (status: SearchInputProps) => set({ searchInput: status }),
}));