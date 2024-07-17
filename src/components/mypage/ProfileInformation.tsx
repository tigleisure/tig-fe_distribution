import { ProfileInformationItemProps } from 'types/mypage/MyPageTypes';
import ProfileInformationItem from './ProfileInformationItem';
import { useGetUserInfo } from '@apis/mypage/getUserInfo';
import Lottie from 'lottie-react';
import TigLoadingAnimation from '@public/lottie/TigLoadingAnimation.json';

export default function ProfileInformation() {
  const { data, isSuccess } = useGetUserInfo();

  if (!isSuccess)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Lottie
          animationData={TigLoadingAnimation}
          style={{ width: '20.83%' }}
          className="self-center"
        />
      </div>
    );

  return (
    <div
      id="profile-info-container"
      className="w-full h-fit flex flex-col gap-y-4"
    >
      <ProfileInformationItem
        labelName="이름"
        inputValue={data?.result.name || ''}
      />
      <ProfileInformationItem
        labelName="휴대폰번호"
        inputValue={data?.result.phoneNumber || ''}
      />
      <ProfileInformationItem
        labelName="이메일"
        inputValue={data?.result.email || ''}
      />
    </div>
  );
}
