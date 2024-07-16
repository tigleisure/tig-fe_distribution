'use client';
import Lottie from 'lottie-react';
import TigLoadingAnimation from '@public/lottie/TigLoadingAnimation.json';

export default function TigLoadingPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie
        animationData={TigLoadingAnimation}
        style={{ width: 'calc(100% * 5 /24)' }}
      />
    </div>
  );
}
