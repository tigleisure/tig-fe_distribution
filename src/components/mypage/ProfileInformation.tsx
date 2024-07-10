import { ProfileInformationItemProps } from 'types/mypage/MyPageTypes';
import ProfileInformationItem from './ProfileInformationItem';

export default function ProfileInformation() {
  // const [profileInfoDataObject, setProfileInfoDataObject] = useState<
  //   ProfileInformationItemProps[]
  // >([]);

  // useEffect(() => {
  //   const DUMMYPROFILEDATA: ProfileInformationItemProps[] = [
  //     {
  //       labelName: '이름',
  //       inputData: '김티그',
  //     },
  //     {
  //       labelName: '휴대폰번호',
  //       inputData: '',
  //     },
  //     {
  //       labelName: '이메일',
  //       inputData: 'tig@naver.com',
  //     },
  //   ];

  //   setProfileInfoDataObject(DUMMYPROFILEDATA);
  // }, []);

  // 추후에 해당 데이터는 여기에서 상태로 선언해서, useEffect()로 백엔드로부터 받아온 다음, 다시 아래 Item에게 내려줘야함
  // 하위 item 요소에 inputData를 의미하는 상태와, 상태를 바꾸는 setter 함수를 내려줘야함

  return (
    <div
      id="profile-info-container"
      className="w-full h-fit flex flex-col gap-y-4"
    >
      {/* {profileInfoDataObject.map((data) => (
        
      ))} */}

      <ProfileInformationItem labelName="이름" />
      <ProfileInformationItem labelName="휴대폰번호" />
      <ProfileInformationItem labelName="이메일" />
    </div>
  );
}
