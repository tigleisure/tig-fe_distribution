import { create } from 'zustand';

interface Store {
  selectedTab: string | null;
  setSelectedTab: (tab: string) => void;
}

const useTab = create<Store>((set) => ({
  selectedTab: '홈',
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}));

export default useTab;
