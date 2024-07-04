export default function ProfileInformation() {
  return (
    <div
      id="profile-info-container"
      className="w-full h-fit flex flex-col gap-y-4"
    >
      <div
        id="nameDiv"
        className="w-full h-fit flex justify-between items-center gap-x-[156px]"
      >
        <div
          id="labelAndName"
          className="flex justify-between items-center gap-x-[63px]"
        >
          <span id="nameLabel" className="caption2 text-grey5">
            이름
          </span>
          {/* 해당 이름은 추후에 변경 가능 */}
          <span id="userName" className="body4 text-grey7">
            김티그
          </span>
        </div>
        <button className="w-fit h-fit rounded-md title4 text-grey7 bg-white shadow-mypageButton px-[14px] py-[8px]">
          변경
        </button>
      </div>
      <div
        id="phoneNumberDiv"
        className="w-full h-fit flex justify-between items-center gap-x-[59px]"
      >
        <div
          id="labelAndPhoneNumber"
          className="flex justify-between items-center gap-x-[33px]"
        >
          <span id="phoneNumberLabel" className="caption2 text-grey5">
            휴대폰번호
          </span>
          {/* 해당 이름은 추후에 변경 가능 */}
          <span id="userPhoneNumber" className="body4 text-grey3">
            휴대폰번호를 입력해주세요
          </span>
        </div>
        <button className="w-fit h-fit rounded-md title4 text-white bg-primary_orange1 px-[14px] py-[8px]">
          변경
        </button>
      </div>
      <div
        id="emailDiv"
        className="w-full h-fit flex justify-between items-center gap-x-[108px]"
      >
        <div
          id="labelAndEmail"
          className="flex justify-between items-center gap-x-[53px]"
        >
          <span id="emailLabel" className="caption2 text-grey5">
            이메일
          </span>
          {/* 해당 이름은 추후에 변경 가능 */}
          <span id="userEmail" className="body4 text-grey7">
            tig@naver.com
          </span>
        </div>
        <button className="w-fit h-fit rounded-md title4 text-grey7 bg-white shadow-mypageButton px-[14px] py-[8px]">
          변경
        </button>
      </div>
    </div>
  );
}
