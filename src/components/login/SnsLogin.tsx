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
      href={'https://tigleisure.com/oauth2/authorization/kakao'}
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
      {/* <Link
        href={
          'https://accounts.kakao.com/login/simple/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fscope%3Dprofile_nickname%2520profile_image%2520account_email%26response_type%3Dcode%26state%3DoFl5DpLznv_lgG-V7DYcVjcZ0LkO61KJGVlC4UEFH9w%253D%26redirect_uri%3Dhttp%253A%252F%252F13.209.131.90%253A8080%252Flogin%252Foauth2%252Fcode%252Fkakao%26through_account%3Dtrue%26client_id%3D0307650b397857dfa903ca697df83f62&talk_login=#simpleLogin'
        }
        className="w-full"
      >
        </Link> */}
      <SnsLoginComponent companyName="kakao" />

      <SnsLoginComponent companyName="google" />
    </div>
  );
}
