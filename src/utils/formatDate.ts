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
