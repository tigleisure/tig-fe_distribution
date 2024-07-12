import KakaoLogoSVG from '@public/svg/kakaoLogo.svg';
import GoogleLogoSVG from '@public/svg/googleLogo.svg';
import { cn } from '@utils/cn';
import Link from 'next/link';

interface SnsLoginProps {
  companyName: string;
}

function SnsLoginComponent({ companyName }: SnsLoginProps) {
  return (
    <Link
      href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=0307650b397857dfa903ca697df83f62&redirect_uri=${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}/login/oauth2/code/kakao`}
      id="kakaoLogo"
      className={cn(
        'w-full h-[47px] flex justify-center items-center rounded-[10px] hover:cursor-pointer',
        {
          'gap-x-[10px] bg-[#FEE500]': companyName === 'kakao',
          'gap-x-[15px] bg-white border-[1px] border-grey3':
            companyName === 'google',
          '': companyName === 'kakao',
        }
      )}
    >
      {companyName === 'kakao' && <KakaoLogoSVG />}
      {companyName === 'google' && <GoogleLogoSVG />}
      <span className="text-grey7 body2">
        {companyName === 'kakao'
          ? '카카오'
          : companyName === 'google'
          ? 'google'
          : null}
        로 로그인
      </span>
    </Link>
  );
}

export default function SnsLogin() {
  return (
    <div className="w-full h-fit flex flex-col justify-between items-center gap-y-[10px]">
      <SnsLoginComponent companyName="kakao" />
      <SnsLoginComponent companyName="google" />
    </div>
  );
}
