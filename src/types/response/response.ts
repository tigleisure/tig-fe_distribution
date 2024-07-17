import { ResultCardProps } from 'types/search/result/searchResult';
import { deleteFromWishList } from '../../apis/wishlist/deleteFromWishlist';

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
