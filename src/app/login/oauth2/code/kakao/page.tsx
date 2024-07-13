import { Suspense } from 'react';
import KakaoLoginLogic from './KakaoLoginLogic';

export default function KakaoOuthCodeSendPage() {
  return (
    <Suspense>
      <KakaoLoginLogic />
    </Suspense>
  );
}
