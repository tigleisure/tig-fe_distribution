import NavBar from '@components/all/NavBar/NavBar';
import WarningLogoSVG from '@public/svg/notfound/warningLogo.svg';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <main className="w-full h-full flex flex-col justify-center items-center">
        <WarningLogoSVG />
        <div className="w-eightNineWidth h-fit flex flex-col items-center gap-y-[10px] mt-5 mb-10">
          <span className="w-full title2 text-grey7 text-center">
            찾을 수 없는 페이지입니다.
          </span>
          <span className="w-full caption1 text-grey5 flex justify-center text-center">
            페이지가 존재하지 않거나,
            <br />
            사용할 수 없는 페이지입니다.
          </span>
        </div>
        <Link
          href={'/'}
          className="w-fit h-fit bg-grey7 title3 text-white rounded-[50px] px-4 py-[14px]"
        >
          홈으로 돌아가기
        </Link>
      </main>
      <NavBar />
    </>
  );
}
