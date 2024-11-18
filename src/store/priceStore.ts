import { create } from 'zustand';

interface Store {
  price: number;
  priceStack: number[];
  isFromReservation: boolean;
  isPriceChanged: boolean;
  setPrice: (value: number) => void;
  setIsFromReservation: (value: boolean) => void;
  pushPrice: (value: number) => void;
  popPrice: () => void;
  clearPriceStack: () => void;
  getPriceStackLength: () => number;
}

export const usePriceStore = create<Store>((set, get) => ({
  price: 0,
  priceStack: [],
  isFromReservation: false,
  isPriceChanged: false,

  // 기존 메서드
  setPrice: (value) => set({ price: value }),
  setIsFromReservation: (value) => set({ isFromReservation: value }),

  // 스택에 가격 추가
  pushPrice: (value) => {
    const currentStack = get().priceStack;
    const topPrice = currentStack[currentStack.length - 1];

    // 새로운 값이 top 값과 다르면 스택을 비우고 새로운 값만 추가
    const updatedStack =
      topPrice !== value ? [value] : [...currentStack, value];
    const newPrice = updatedStack.reduce((acc, cur) => acc + cur, 0);

    set({ priceStack: updatedStack, price: newPrice });
  },

  // 스택에서 가격 제거
  popPrice: () => {
    const currentStack = get().priceStack;
    if (currentStack.length === 0) return;

    const updatedStack = currentStack.slice(0, -1);
    const newPrice = updatedStack.reduce((acc, cur) => acc + cur, 0);

    set({ priceStack: updatedStack, price: newPrice });
  },

  // 스택 초기화
  clearPriceStack: () => {
    set({ priceStack: [], price: 0 });
  },

  // 스택 길이 반환
  getPriceStackLength: () => {
    return get().priceStack.length;
  },
}));
