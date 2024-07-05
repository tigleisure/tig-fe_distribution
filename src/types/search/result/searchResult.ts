export interface ResultCardProps {
  clubName: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: string;
  gameType: '게임' | '시간';
  isEvent?: boolean;
  isHeart?: boolean;
  image: string;
}
