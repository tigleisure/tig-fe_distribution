export interface ResultCardProps {
  clubName: string;
  id: number;
  address: string;
  ratingSum: number; // 평점의 평균을 의미하는듯
  ratingCount: number; // 평점을 매긴 카운트
  price: number;
  type: 'GAME' | 'TIME';
  category:
    | 'TENNIS'
    | 'BALLING'
    | 'POCKET_BALL'
    | 'TABLE_TENNIS'
    | 'SCREEN_GOLF';
  isEvent?: boolean;
  isHeart?: boolean;
  imageUrls: string[];
  isLast?: boolean;
  latitude?: number;
  longitude?: number;
  isFirst?: boolean;
}
