import { ResultCardProps } from 'types/search/result/searchResult';

export interface WishListResponse {
  result: ResultCardProps[];
  resultCode: number;
  resultMsg: string;
}
