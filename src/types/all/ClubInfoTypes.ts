export interface clubInfoProps {
  id: string;
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
  isHeart: boolean;
  longitude: number;
  category: string;
  type: 'GAME' | 'TIME';
  imageUrls: string[];
  presignedImageUrls: string[];
  amenities: string[];
}
