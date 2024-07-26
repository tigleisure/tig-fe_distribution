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
  id: number;
  clubName: string;
  address: string;
  ratingSum: number | null;
  ratingCount: number | null;
  avgRating: number | null;
  price: number;
  phoneNumber: string;
  snsLink: string;
  businessHours: string;
  latitude: number;
  longitude: number;
  category: string;
  type: string;
  imageUrls: string[];
  presignedImageUrls: string[] | null;
}

interface Result {
  nearestClubs: Club[];
  popularClubs: Club[];
  recommendedClubs: Club[];
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
