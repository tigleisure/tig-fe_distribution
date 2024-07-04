import MyProfileDefaultImage from '@public/svg/myProfileDefaultImage.svg';
import ProfileInformation from './ProfileInformation';
import ToastUI from './ToastUI';

export default function My() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-mypageWidth h-fit flex flex-col items-center gap-y-[30px] mb-[30px]">
        <MyProfileDefaultImage />
        <ProfileInformation />
      </div>
      <div className="w-full border-[1px] border-grey2 mb-[30px]"></div>
      <div id="buttonDiv" className="w-full ">
        <button className="body4 shadow-myPageLogoutButton rounded-[4px] text-grey4 absolute left-5 px-[14px] py-[10px]">
          로그아웃
        </button>
      </div>
      <ToastUI />
    </div>
  );
}
