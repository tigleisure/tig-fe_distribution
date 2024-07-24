export const generateTimeSlots = (start: string, end: string) => {
  const timeSlots = [];
  let [startHour, startMinute] = start.split(':').map(Number);
  let [endHour, endMinute] = end.split(':').map(Number);

  let endNextDay = startHour > endHour || (startHour === endHour && startMinute > endMinute);

  while (
    startHour < 24 &&
    (startHour < endHour || (startHour === endHour && startMinute < endMinute)) ||
    endNextDay
  ) {
    const hour = startHour.toString().padStart(2, '0');
    const minute = startMinute.toString().padStart(2, '0');
    timeSlots.push(`${hour}:${minute}`);
    startMinute += 30;
    if (startMinute >= 60) {
      startMinute -= 60;
      startHour += 1;
    }
    if (startHour >= 24) {
      startHour = 0;
      endNextDay = false;
    }
  }

  // 종료 시간이 다음 날인 경우, 자정 이후의 타임 슬롯 생성
  while (endNextDay && (startHour < endHour || (startHour === endHour && startMinute < endMinute))) {
    const hour = startHour.toString().padStart(2, '0');
    const minute = startMinute.toString().padStart(2, '0');
    timeSlots.push(`${hour}:${minute}`);
    startMinute += 30;
    if (startMinute >= 60) {
      startMinute -= 60;
      startHour += 1;
    }
  }

  // 마지막 타임 슬롯 제거
  if (timeSlots.length > 1 && timeSlots[timeSlots.length - 1] === end) {
    timeSlots.pop();
  }

  return timeSlots;
};