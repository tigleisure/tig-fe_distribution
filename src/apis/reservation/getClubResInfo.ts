import { instance } from '@apis/instance';
import { useQuery } from '@tanstack/react-query';

interface Result {
  clubName: string;
  address: string;
  prices: PricesInfo;
  category:
    | 'TENNIS'
    | 'BALLING'
    | 'TABLE_TENNIS'
    | 'GOLF'
    | 'FOOTBALL'
    | 'SQUSH'
    | 'BILLIARDS'
    | 'BASEBALL';
  // 추후 제대로 설정해야 함
  operatingHours: operatingHour[];
}

export interface operatingHour {
  dayOfWeek: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  startTime: string;
  endTime: string;
}

export type PricesInfo =
  | SoccerPrice[]
  | BaseballPrice[]
  | SquashPrice[]
  | TennisPrice[]
  | GolfPrice[]
  | BallingPrice[];

export interface BallingPrice {
  programName: string;
  price: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  gameCount: number;
}

export interface GolfPrice {
  programName: string;
  duration: number;
  price: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  holes: number;
}
export interface TennisPrice {
  programName: string;
  duration: number;
  price: number;
  dayOfWeek: string;
  countPerWeek: number;
}

export interface SoccerPrice {
  programName: string;
  duration: number;
  price: number;
}

export interface BaseballPrice {
  programName: string;
  duration: number;
  price: number;
  inning: number;
}

export interface SquashPrice {
  programName: string;
  duration: number;
  price: number;
  lessonCount: number;
}

interface GetClubResInfoResponse {
  result: Result;
  resultCode: number;
  resultMsg: string;
}

const getClubResInfo = async (
  clubId: string
): Promise<GetClubResInfoResponse> => {
  return instance.get(`/api/v1/reservation/club/${clubId}`);
};

export const useGetClubResInfo = (clubId: string) => {
  return useQuery({
    queryKey: ['clubResInfo', clubId],
    queryFn: () => getClubResInfo(clubId),
  });
};
