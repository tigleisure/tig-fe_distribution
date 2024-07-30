'use client';
import NonLoginIconSVG from '@public/svg/nonLogin/nonLoginIcon.svg';
import { useRouter } from 'next/navigation';

export default function NonLoginReservationList() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <NonLoginIconSVG className="mb-5" />
      <div className="title2 text-grey7 mb-[30px]">
        네트워크 에러가 발생했습니다.
      </div>
      <button
        className="rounded-[50px] title3 text-white bg-black px-4 py-[14px]"
        onClick={() => router.replace('/login')}
      >
        이전 페이지로 돌아가기
      </button>
    </div>
  );
}
