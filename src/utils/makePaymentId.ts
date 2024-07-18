import CryptoJS from 'crypto-js';

export default function makePaymentId(
  memberId: number,
  currentDateString: string
): string {
  return CryptoJS.MD5(`${memberId}${currentDateString}`).toString(
    CryptoJS.enc.Hex
  );
}
