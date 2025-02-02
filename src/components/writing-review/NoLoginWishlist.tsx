'use client';
import NonLoginIconSVG from '@public/svg/nonLogin/nonLoginIcon.svg';
import { useRouter } from 'next/navigation';

export default function NoLoginWishList() {
  const router = useRouter();

  return (
    <div className="w-full h-full mt-[68px] flex flex-col justify-center items-center">
      <NonLoginIconSVG className="mb-5" />
      <div className="title2 text-grey7 mb-[40px]">
        위시리스트를 확인하려면 로그인해주세요.
      </div>
      
      <button
        className="rounded-[50px] title3 text-white bg-black px-4 py-[14px]"
        onClick={() => router.replace('/login')}
      >
        로그인하러 가기
      </button>
    </div>
  );
}
