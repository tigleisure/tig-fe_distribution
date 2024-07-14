export interface ResultCardProps {
  clubName: string;
  id: number;
  address: string;
  ratingSum: number;
  ratingCount: number;
  price: number;
  type: 'GAME' | 'TIME';
  category: 'FOOTBALL' | 'BALLING' | 'POCKET_BALL' | 'TABLE_TENNIS';
  isEvent?: boolean;
  isHeart?: boolean;
  imageUrls: string[];
  isLast?: boolean;
}
