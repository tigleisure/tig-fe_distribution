import KakaoLogoSVG from '@public/svg/kakaoLogo.svg';
import GoogleLogoSVG from '@public/svg/googleLogo.svg';

export default function SnsLogin() {
  return (
    <div className="w-full h-fit flex flex-col justify-between items-center gap-y-[10px]">
      <div
        id="kakaoLogo"
        className="w-full h-[47px] flex justify-center items-center gap-x-[10px] bg-[#FEE500] rounded-[10px]"
      >
        <KakaoLogoSVG />
        <span className="text-grey7 body2">카카오로 로그인</span>
      </div>
      <div
        id="googleLogo"
        className="w-full h-[47px] flex justify-center items-center gap-x-[15px] bg-white rounded-[10px] border-[1px] border-grey3"
      >
        <GoogleLogoSVG />
        <span className="text-grey7 body2">Google로 로그인</span>
      </div>
    </div>
  );
}
