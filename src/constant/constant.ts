import { table } from 'console';

export const allleisureArray = [
  '전체',
  '당구',
  '볼링',
  '골프',
  '탁구',
  '테니스',
  '축구',
  '야구',
  '스쿼시',
];
export const homeleisureArray = [
  '홈',
  '당구',
  '볼링',
  '골프',
  '탁구',
  '테니스',
  '축구',
  '야구',
  '스쿼시',
];
export const leisureArray = [
  '당구',
  '볼링',
  '골프',
  '탁구',
  '테니스',
  '축구',
  '야구',
  '스쿼시',
];

export const golfArray = [
  '스크린 골프',
  '골프 연습장',
  '골프 레슨',
  '필드 골프',
];
export const pocketballArray = ['중대', '대대', '포켓볼'];
export const baseballArray = ['스크린야구', '야구연습장'];
export const squashArray = [
  '스쿼시 연습장',
  '스쿼시 레슨',
  '스쿼시 원데이 클래스',
];
export const tennisArray = ['테니스 코트', '테니스 레슨', '테니스 볼 머신'];
export const footballArray = ['축구장 대여', '축구 볼머신'];
export const tabletennisArray = ['단식', '복식', '일일권', '시간권'];
export const balling = ['일반 볼링', '락볼링'];

export const subtabArrays: { [key: string]: string[] } = {
  골프: golfArray,
  당구: pocketballArray,
  야구: baseballArray,
  스쿼시: squashArray,
  테니스: tennisArray,
  축구: footballArray,
  탁구: tabletennisArray,
  볼링: balling,
};

export const mainArray = ['스포츠'];
export const detailArrayWhenReview = ['기본정보', '편의시설', '방문자 리뷰'];
export const detailArrayWhenNoReview = ['기본정보', '편의시설'];

export const categoryMapKorToEng: { [key: string]: string } = {
  당구: 'BILLIARDS',
  볼링: 'BALLING',
  골프: 'GOLF',
  탁구: 'TABLE_TENNIS',
  테니스: 'TENNIS',
  축구: 'FOOTBALL',
  야구: 'BASEBALL',
  스쿼시: 'SQUASH',
};

export const categoryMapEngToKor: { [key: string]: string } = {
  BILLIARDS: '당구',
  BALLING: '볼링',
  GOLF: '골프',
  TABLE_TENNIS: '탁구',
  TENNIS: '테니스',
  FOOTBALL: '축구',
  BASEBALL: '야구',
  SQUASH: '스쿼시',
};

export const facilityMapEngToKor: { [key: string]: string } = {
  WIRELESS_INTERNET: '무선 인터넷',
  TOILET_CLASSIFICATION: '남/녀 화장실 구분',
  GROUP_AVAILABILITY: '단체 이용 가능',
  WAITING_SPACE: '대기 공간',
  PET_ALLOWED: '반려동물 동반',
  PARKING_AVAILABLE: '주차 가능',
  VISIT_SERVICE: '방문접수/출장',
  DELIVERY_AVAILABLE: '포장/배달 가능',
  PAID_PARKING: '주차 가능 유료',
  DRESSING_ROOM: '탈의실',
  WATER_PURIFIER: '정수기',
  PERSONAL_LOCKER: '개인 락커',
  REST_FACILITY: '오락 시설',
  KIDS_FACILITY: '유아 시설',
  WHEELCHAIR_ACCESSIBLE: '장애인 휠체어 이용 가능',
  ENTRANCE_WHEELCHAIR_ACCESSIBLE: '출입구 휠체어 이용 가능',
  SEAT_WHEELCHAIR_ACCESSIBLE: '좌석 휠체어 가능',
  DISABLED_PARKING: '장애인 주차 구역',
};
