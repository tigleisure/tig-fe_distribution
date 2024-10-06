'use client';
import MyProfileDefaultImage from '@public/svg/myProfileDefaultImage.svg';
import ProfileInformation from './ProfileInformation';
import useModal from '@store/modalStore';
import { useGetUserInfo } from '@apis/mypage/getUserInfo';
import Image from 'next/image';
import Feedback from './Feedback';
import Footer from '@components/all/Footer/Footer';

export default function My() {
  const setIsOpen = useModal((state) => state.setSelectedIsModalOpen);
  const { data } = useGetUserInfo();

  return (
    <div className="w-full flex flex-col items-center mt-[68px] pt-5">
      <div className="w-eightNineWidth mypageWidth h-fit flex flex-col items-center gap-y-[30px] mb-[30px]">
        {data.result.profileImage ? (
          <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden">
            <Image
              src={data.result.profileImage}
              alt="프로필 이미지"
              className="object-cover"
              layout="fill"
            />
          </div>
        ) : (
          <MyProfileDefaultImage />
        )}

        <ProfileInformation />
      </div>
      <Feedback />
      <div id="buttonDiv" className="w-eightNineWidth ">
        <button
          className="body4 shadow-myPageLogoutButton rounded-[4px] text-grey4 left-5 px-[14px] py-[10px] mb-[60px]"
          onClick={() => setIsOpen(true)}
        >
          로그아웃
        </button>
      </div>
      <Footer />
    </div>
  );
}
