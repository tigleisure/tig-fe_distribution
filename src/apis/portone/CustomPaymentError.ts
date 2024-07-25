export interface CustomPaymentError extends Error {
  paymentId: string;
}
