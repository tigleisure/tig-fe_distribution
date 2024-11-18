import { PricesInfo, operatingHour } from '@apis/reservation/getClubResInfo';

export interface clubInfoProps {
  clubId: string;
  clubName: string;
  address: string;
  ratingSum: number;
  ratingCount: number;
  avgRating: number;
  prices: PricesInfo;
  phoneNumber: string;
  snsLink: string;
  businessHours: string;
  latitude: number;
  isHeart: boolean;
  longitude: number;
  category: string;
  type: 'GAME' | 'TIME';
  imageUrls: string[];
  presignedImageUrls: string[];
  amenities: string[];
  operatingHours: operatingHour[];
}
