import { Suspense } from 'react';
import GoogleLoginLogic from './GoogleLoginLogic';

export default function GoogleOuthCodeSendPage() {
  return (
    <Suspense>
      <GoogleLoginLogic />
    </Suspense>
  );
}
