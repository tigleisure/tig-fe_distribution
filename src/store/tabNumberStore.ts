import { create } from 'zustand';

interface Store {
  selectedTab: number | null;
  setSelectedTab: (tab: number) => void;
}

const useTab = create<Store>((set) => ({
  selectedTab: 0,
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}));

export default useTab;
