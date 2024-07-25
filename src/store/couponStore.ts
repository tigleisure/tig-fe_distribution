import { create } from 'zustand';

interface couponDetail {
  discountPrice: number;
  couponDescription: string;
  isValid: boolean;
  couponExpireDate: string;
}

interface Store {
  couponList: couponDetail[] | [];
  setCouponList: (status: couponDetail[]) => void;
}

const useCoupon = create<Store>((set) => ({
  couponList: [],
  setCouponList: (status) => set({ couponList: status }),
}));

export default useCoupon;

interface isCouponPageOpenProps {
  isCouponPageOpen: boolean;
  setIsCouponPageOpen: (status: boolean) => void;
}

export const useIsCouponPageOpen = create<isCouponPageOpenProps>((set) => ({
  isCouponPageOpen: false,
  setIsCouponPageOpen: (status) => set({ isCouponPageOpen: status }),
}));

interface selectedCouponNumberProps {
  selectedCouponNumber: number;
  setSelectedCouponNumber: (status: number) => void;
}

export const useSelectedCouponNumber = create<selectedCouponNumberProps>(
  (set) => ({
    selectedCouponNumber: -1,
    setSelectedCouponNumber: (status) => set({ selectedCouponNumber: status }),
  })
);
