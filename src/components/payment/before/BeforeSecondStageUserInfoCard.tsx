interface BeforeSecondStageUserInfoCardProps {
  userName: string;
  phoneNumber: string | null;
}

export default function BeforeSecondStageUserInfoCard({
  userName,
  phoneNumber,
}: BeforeSecondStageUserInfoCardProps) {
  return (
    <div className="w-full h-fit rounded-[10px] flex flex-col items-center gap-y-5 bg-white py-5">
      <div className="w-sevenEightWidth h-fit flex flex-col gap-y-5">
        <span className="title3 text-grey7">예약 고객</span>
        <div className="w-full border-b-[1px] border-grey2" />
      </div>
      <div className="w-sevenEightWidth flex justify-between items-center gap-x-[43px]">
        <span className="title4 w-[21px] text-grey6">이름</span>
        <input
          type="text"
          value={userName}
          className="w-[80%] border-b-[1px] border-grey3"
        />
      </div>
      <div className="w-sevenEightWidth flex justify-between items-center gap-x-6">
        <span className="w-[40px] flex gap-x-[1px] items-center title4 text-grey6 ">
          {'연락처'}
          <div className="h-full title4 text-status_red1">*</div>
        </span>
        <input
          type="text"
          // value={userName}
          placeholder="휴대폰 번호 입력"
          className="placeholder:body4 placeholder:text-grey3 w-[80%] border-b-[1px] border-grey3"
        />
      </div>
    </div>
  );
}
