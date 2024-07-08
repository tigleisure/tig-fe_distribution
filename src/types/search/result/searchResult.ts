export interface ResultCardProps {
  clubName: string;
  clubId: number;
  location: string;
  rating: number;
  reviewCount: number;
  price: string;
  gameType: '게임' | '시간';
  isEvent?: boolean;
  isHeart?: boolean;
  image: string;
  isLast?: boolean;
}
