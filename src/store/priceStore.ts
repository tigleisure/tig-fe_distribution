import { create } from 'zustand';

interface PriceItem {
  name: string;
  price: number;
}

interface Store {
  price: number;
  priceStack: PriceItem[];
  isFromReservation: boolean;
  isPriceChanged: boolean;
  setPrice: (value: number) => void;
  setIsFromReservation: (value: boolean) => void;
  pushPrice: (item: PriceItem) => void;
  popPrice: () => void;
  clearPriceStack: () => void;
  getPriceStackLength: () => number;
  getTopItemName: () => string | null; // 추가
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
  pushPrice: (item) => {
    const currentStack = get().priceStack;
    const topItem = currentStack[currentStack.length - 1];

    // 새로운 아이템이 top 값과 다르면 스택을 비우고 새로운 아이템만 추가
    const updatedStack =
      topItem?.name !== item.name ? [item] : [...currentStack, item];
    const newPrice = updatedStack.reduce((acc, cur) => acc + cur.price, 0);

    set({ priceStack: updatedStack, price: newPrice });
  },

  // 스택에서 가격 제거
  popPrice: () => {
    const currentStack = get().priceStack;
    if (currentStack.length === 0) return;

    const updatedStack = currentStack.slice(0, -1);
    const newPrice = updatedStack.reduce((acc, cur) => acc + cur.price, 0);

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

  // 스택의 top 아이템 이름 반환
  getTopItemName: () => {
    const currentStack = get().priceStack;
    if (currentStack.length === 0) return null; // 스택이 비어있으면 null 반환
    return currentStack[currentStack.length - 1].name; // 마지막 아이템의 이름 반환
  },
}));
