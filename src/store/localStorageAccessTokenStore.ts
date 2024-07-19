import { create } from 'zustand';

interface Store {
  localStorageAccessTokenState: string | null;
  setLocalStorageAccessTokenState: (tk: string | null) => void;
}

const useLocalStorageState = create<Store>((set) => ({
  localStorageAccessTokenState: null,
  setLocalStorageAccessTokenState: (token) =>
    set({ localStorageAccessTokenState: token }),
}));

export default useLocalStorageState;
