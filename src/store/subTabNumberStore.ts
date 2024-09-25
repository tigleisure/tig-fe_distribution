import { create } from 'zustand';

interface Store {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const useSubTab = create<Store>((set) => ({
  selectedTab: '',
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}));

export default useSubTab;
