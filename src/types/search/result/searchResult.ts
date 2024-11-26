import { operatingHour } from '@apis/reservation/getClubResInfo';

export interface ResultCardProps {
  clubName: string;
  clubId: number;
  address: string;
  ratingSum: number; // 평점의 평균을 의미하는듯
  ratingCount: number; // 평점을 매긴 카운트
  avgRating: number;
  prices: any;
  type: 'GAME' | 'TIME';
  category:
    | 'TENNIS'
    | 'BALLING'
    | 'POCKET_BALL'
    | 'TABLE_TENNIS'
    | 'GOLF'
    | 'FOOTBALL'
    | 'SQUSH'
    | 'BILLIARDS';
  isEvent?: boolean;
  isHeart?: boolean;
  imageUrls: string[];
  isLast?: boolean;
  latitude?: number;
  longitude?: number;
  isFirst?: boolean;
  distance?: number;
  operatingHours?: operatingHour[];
}
