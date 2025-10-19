import { create } from 'zustand';

export interface paymentFirstStageInfoProps {
  clubName: string;
  clubAddress: string;
  date: string;
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
  startTime: string;
  endTime?: string;
  gameCount?: number;
  price: number;
  message: string;
  gameDescription: string;
  gameType: string;
  endDate: string;
  travelType: string;
  departureDate: string;
  returnDate: string;
  departurePlace: string;
  returnPlace: string;
  receiptDate: string;
  deliveryAddress: string;
}

interface paymentFirstStageStore {
  firstStageInfoObject: paymentFirstStageInfoProps;
  setFirstStageInfoObject: (status: paymentFirstStageInfoProps) => void;
}

// first stage에서의 정보를 관리
export const usePaymentFirstStage = create<paymentFirstStageStore>((set) => ({
  firstStageInfoObject: {
    clubName: '',
    clubAddress: '',
    date: '',
    adultCount: 0,
    teenagerCount: 0,
    kidsCount: 0,
    startTime: '',
    endTime: '',
    gameCount: 0,
    price: 0,
    message: '',
    gameDescription: '',
    gameType: '',
    endDate: '',
    travelType: '',
    departureDate: '',
    returnDate: '',
    departurePlace: '',
    returnPlace: '',
    receiptDate: '',
    deliveryAddress: '',
  },
  setFirstStageInfoObject: (status: paymentFirstStageInfoProps) =>
    set({ firstStageInfoObject: status }),
}));

export interface paymentSecondStageInfoProps {
  userName: string;
  phoneNumber: string;
  couponDiscountPrice: number;
  price: number;
  paymentMethod: 'kakaoPayment' | 'tossAndCardPayment' | null;
}

interface paymentSecondStageStore {
  secondStageInfoObject: paymentSecondStageInfoProps;
  setSecondStageInfoObject: (status: paymentSecondStageInfoProps) => void;
}

// second stage에서의 정보를 관리
export const usePaymentSecondStage = create<paymentSecondStageStore>((set) => ({
  secondStageInfoObject: {
    userName: '',
    phoneNumber: '',
    couponDiscountPrice: 0,
    price: 0,
    paymentMethod: null,
  },
  setSecondStageInfoObject: (status: paymentSecondStageInfoProps) =>
    set({ secondStageInfoObject: status }),
}));
