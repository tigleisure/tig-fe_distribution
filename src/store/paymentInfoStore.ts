import { create } from 'zustand';

export interface paymentFirstStageInfoProps {
  companyName: string;
  companyAddress: string;
  eventDate: string;
  adultCount: number;
  youngManCount?: number;
  kidCount?: number;
  eventStartTime: string;
  eventEndTime: string;
  stageFirstPrice: number;
}

interface paymentFirstStageStore {
  firstStageInfoObject: paymentFirstStageInfoProps;
  setFirstStageInfoObject: (status: paymentFirstStageInfoProps) => void;
}

// first stage에서의 정보를 관리
export const usePaymentFirstStage = create<paymentFirstStageStore>((set) => ({
  firstStageInfoObject: {
    companyName: '',
    companyAddress: '',
    eventDate: '',
    adultCount: 0,
    youngManCount: 0,
    kidCount: 0,
    eventStartTime: '',
    eventEndTime: '',
    stageFirstPrice: 0,
  },
  setFirstStageInfoObject: (status: paymentFirstStageInfoProps) =>
    set({ firstStageInfoObject: status }),
}));

export interface paymentSecondStageInfoProps {
  userName: string;
  phoneNumber: string;
  couponDiscountPrice: number;
  defaultPrice: number;
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
    defaultPrice: 0,
  },
  setSecondStageInfoObject: (status: paymentSecondStageInfoProps) =>
    set({ secondStageInfoObject: status }),
}));
