export const generateTimeSlots = (start:string, end:string) => {
  const timeSlots = [];
  let [startHour, startMinute] = start.split(':').map(Number);
  let [endHour, endMinute] = end.split(':').map(Number);

  while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
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