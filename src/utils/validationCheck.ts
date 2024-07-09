export function isValidEmail(email: string) {
  // 간단한 이메일 정규 표현식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phoneNumber: string) {
  // 간단한 전화번호 정규 표현식 (숫자, 하이픈, 괄호, 공백 허용)
  const phoneRegex =
    /^(?:\+?82-?|0)(?:10|(?:2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))-?\d{3,4}-?\d{4}$/;
  return phoneRegex.test(phoneNumber);
}
