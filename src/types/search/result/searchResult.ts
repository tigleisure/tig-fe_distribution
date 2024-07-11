export interface ResultCardProps {
  clubName: string;
  clubId: number;
  location: string;
  rating: number;
  reviewCount: number;
  price: string;
  gameType: '게임' | '시간';
  gameNameType: '당구' | '볼링' | '스크린골프' | '탁구' | '테니스';
  isEvent?: boolean;
  isHeart?: boolean;
  image: string;
  isLast?: boolean;
}
