import { formatDate } from 'date-fns';
import { create } from 'zustand';

interface SearchInputProps {
  searchValue: string;
  searchDate: string;
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
}

interface Store {
  searchInput: SearchInputProps;
  setSearchInput: (status: SearchInputProps) => void;
}

export const useSearchInputInfo = create<Store>((set) => ({
  searchInput: {
    searchValue: '',
    searchDate: formatDate(new Date(), "yyyy-MM-dd'T'00:00:00"),
    adultCount: 0,
    teenagerCount: 0,
    kidsCount: 0,
  },
  setSearchInput: (status: SearchInputProps) => set({ searchInput: status }),
}));
