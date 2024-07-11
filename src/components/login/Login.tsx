import LoginTigSVG from '@public/svg/loginTig.svg';
import SnsLogin from './SnsLogin';

export default function Login() {
  return (
    // 최외곽 div는 추후 삭제 가능
    <div className="w-full flex justify-center pt-36">
      <div className="w-loginWidth h-fit flex flex-col gap-y-[30px] items-center">
        <LoginTigSVG />
        <p className="w-full h-fit body2 text-center text-grey6">
          소셜 로그인을 통해 가입할 수 있습니다.
        </p>
        <div className="w-full border-t-[1px] border-grey3"></div>
        <SnsLogin />
      </div>
    </div>
  );
}
