import NonLoginIconSVG from '@public/svg/nonLogin/nonLoginIcon.svg';
import Link from 'next/link';

export default function NonLoginReservationList() {
  return (
    <div className="w-full h-full mt-[68px] flex flex-col justify-center items-center">
      <NonLoginIconSVG className="mb-5" />
      <div className="title2 text-grey7 mb-[40px]">
        예약 내역을 확인하려면 로그인해주세요.
      </div>
      <Link href={'/login'}>
        <button className="rounded-[50px] title3 text-white bg-black px-4 py-[14px]">
          로그인하러 가기
        </button>
      </Link>
    </div>
  );
}
