import { ProfileInformationItemProps } from 'types/mypage/MyPageTypes';
import ProfileInformationItem from './ProfileInformationItem';

export default function ProfileInformation() {
  const profileData: ProfileInformationItemProps[] = [
    {
      wholeGap: 156,
      labelGap: 63,
      labelName: '이름',
      placeholderName: '김티그',
      placeholderColor: 'grey7',
      isButtonBorder: true,
      buttonText: '변경',
    },
    {
      wholeGap: 59,
      labelGap: 33,
      labelName: '휴대폰번호',
      placeholderName: '휴대폰번호를 입력해주세요',
      placeholderColor: 'grey3',
      isButtonBorder: false,
      buttonText: '변경',
    },
    {
      wholeGap: 108,
      labelGap: 53,
      labelName: '이메일',
      placeholderName: 'tig@naver.com',
      placeholderColor: 'grey7',
      isButtonBorder: true,
      buttonText: '변경',
    },
  ];
  return (
    <div
      id="profile-info-container"
      className="w-full h-fit flex flex-col gap-y-4"
    >
      {profileData.map((data, index) => (
        <ProfileInformationItem
          key={data.labelName}
          wholeGap={data.wholeGap}
          labelGap={data.labelGap}
          labelName={data.labelName}
          placeholderName={data.placeholderName}
          placeholderColor={data.placeholderColor}
          isButtonBorder={data.isButtonBorder}
          buttonText={data.buttonText}
        />
      ))}
    </div>
  );
}
