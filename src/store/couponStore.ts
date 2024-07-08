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
  setCouponList: (staus) => set({ couponList: staus }),
}));

export default useCoupon;
