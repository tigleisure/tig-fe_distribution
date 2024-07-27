import { format } from 'date-fns';

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);

  return `${year}.${month}.${day}`;
};

export const formatReservationShowingDate = (dt: string): string => {
  const date = new Date(dt);

  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${month}.${day} (${dayOfWeek})`;
};

// 시간의 양식은 '2024-07-19T14:00:00'임
export const extractOnlyTime = (dt: string): string => {
  const date = new Date(dt);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

// DATE 객체를 받아들여 몇시간의 차이가 나는지를 계산해주는 함수
export const calculateTimeDiff = (
  firstDate: string,
  secondDate: string
): number => {
  // 문자열을 Date 객체로 변환
  const date1 = new Date(firstDate);
  const date2 = new Date(secondDate);

  // 두 Date 객체의 차이를 밀리초 단위로 계산
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());

  // 밀리초를 시간 단위로 변환
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  return diffInHours;
};

export const extractReservationMoment = (timestamp: string): string => {
  // 문자열을 Date 객체로 변환
  let date = new Date(timestamp);

  // 요일 정보
  let days = ['일', '월', '화', '수', '목', '금', '토'];
  let dayOfWeek = days[date.getUTCDay()];

  // 원하는 형식으로 변환
  let year = date.getUTCFullYear();
  let month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  let day = ('0' + date.getUTCDate()).slice(-2);
  let hours = ('0' + date.getUTCHours()).slice(-2);
  let minutes = ('0' + date.getUTCMinutes()).slice(-2);

  let formattedTime = `${year}.${month}.${day} (${dayOfWeek}) ${hours}:${minutes}`;

  return formattedTime;
};

// 시간 비교를 위한 함수
const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// 예약한 시간이 다음 날 일때 업체 시작시간과 비교하여 작다면 다음날로 변환
export const convertToNextDayIfNextDay = (
  reservationStartTime: string,
  clubStartTime: string,
  date: string
) => {
  if (timeToMinutes(reservationStartTime) < timeToMinutes(clubStartTime)) {
    const newDate = new Date(date.slice(0, 10));
    console.log('newDate', newDate);
    const returnNextDay = format(
      new Date(newDate.setDate(newDate.getDate() + 1)),
      'yyyy-MM-dd'
    );
    console.log('returnNextDay', returnNextDay);
    return `${returnNextDay}T00:00:00`;
  }
  return date;
};
