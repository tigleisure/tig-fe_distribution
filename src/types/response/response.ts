import { deleteFromWishList } from '../../apis/wishlist/deleteFromWishlist';
import { ResultCardProps } from 'types/search/result/searchResult';

export interface wishListItemProps {
  id: number;
  clubName: string;
  address: string;
  ratingSum: number;
  ratingCount: number;
  avgRating: number;
  price: number;
  phoneNumber: string;
  snsLink: string;
  businessHours: string;
  latitude: number;
  longitude: number;
  category: string;
  type: 'GAME' | 'TIME';
  imageUrls: string[];
  presignedImageUrls: string[];
}

export interface WishListResponse {
  result: ResultCardProps[];
  resultCode: number;
  resultMsg: string;
}

export interface Club {
  clubId: number;
  clubName: string;
  address: string;
  ratingSum: number;
  ratingCount: number;
  avgRating: number;
  prices: object[];
  phoneNumber: string;
  snsLink: string;
  businessHours: string;
  latitude: number;
  longitude: number;
  category:
    | 'TENNIS'
    | 'BALLING'
    | 'POCKET_BALL'
    | 'TABLE_TENNIS'
    | 'GOLF'
    | 'FOOTBALL'
    | 'SQUSH'
    | 'BILLIARDS';
  type: 'GAME' | 'TIME';
  imageUrls: string[];
  presignedImageUrls: string[];
  isHeart: boolean;
  amenities: null;
}

export interface Package {
  id: number;
  name: string;
  address: string;
  ratingSum: number;
  ratingCount: number;
  avgRating: number;
  // prices: object[];
  price: number;
  phoneNumber: string;
  snsLink: string;
  businessHours: string;
  latitude: number;
  longitude: number;
  category:
    | 'BUS'
    | 'CATERING'
    | 'LUNCH_BOX'
    | 'GROUP_UNIFORM'
    | 'PENSION'
    | 'GOLF_COURSE';
  type: 'GAME' | 'TIME';
  imageUrls: string[];
  presignedImageUrls: string[];
  isHeart: boolean;
  amenities: null;
}
export interface NearestClubsByCategory {
  [key: string]: Club[];
}

export interface RandomPackagesByCategory {
  [key: string]: Package[];
}

interface Result {
  nearestClubs: Club[];
  popularClubs: Club[];
  recommendedClubs: Club[];
  nearestClubsByCategory: NearestClubsByCategory;
}

interface Result2 {
  popularPackages: Package[];
  recommendedPackages: Package[];
  randomPackages: Package[];
  randomPackagesByCategory: RandomPackagesByCategory;
}

export interface PostHomeResponse2 {
  result: Result2[];
  resultCode: number;
  resultMsg: string;
}

export interface PostHomeResponse {
  result: Result[];
  resultCode: number;
  resultMsg: string;
}

export interface NoMeaningfulResultResponse {
  result: Record<string, never>;
  resultCode: number;
  resultMsg: string;
}

export interface UserInfoResult {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  refreshToken: string;
  memberRoleEnum: string;
}
export interface UserInfoResponse {
  result: UserInfoResult;
  resultCode: number;
  resultMsg: string;
}

export interface CouponIssueResponse {
  result: {};
  resultCode: number;
  resultMsg: string;
}

// 현재 백엔드에서 response로 보내주는 실제로는 200 statusCode이지만 실패를 의미하는 응답 인터페이스
export interface noDataServerErrorResponse {
  status: 500;
  divisionCode: string;
  resultMsg: string;
  errors: any;
  reason: string; // 못 찾은 이유를 백엔드에서 보내줌
}

export interface RecentSearches {
  name: string;
  createdAt: string;
}
export interface RecentSearchResponse {
  result: RecentSearches[];
  resultCode: number;
  resultMsg: string;
}

export interface Coupon {
  discount: number;
  name: string;
  description: string;
  expireDate: string;
  couponId: number;
}
export interface CouponResponse {
  result: Coupon[];
  resultCode: number;
  resultMsg: string;
}

export interface IssueCouponResponse {
  result: {
    code: string;
  };
  resultCode: number;
  resultMsg: string;
}

export interface Feedback {
  memberName: string;
  message: string;
}

export interface FeedbackListResponse {
  result: Feedback[];
  resultCode: number;
  resultMsg: string;
}
