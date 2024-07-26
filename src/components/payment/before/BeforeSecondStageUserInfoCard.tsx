'use client';
import { usePaymentSecondStage } from '@store/paymentInfoStore';
import { formatPhoneNumber } from '@utils/formattingPhoneNumber';
import { ChangeEvent } from 'react';

interface BeforeSecondStageUserInfoCardProps {
  userName: string;
  phoneNumber: string;
}

export default function BeforeSecondStageUserInfoCard({
  userName,
  phoneNumber,
}: BeforeSecondStageUserInfoCardProps) {
  const secondStageInfoObject = usePaymentSecondStage(
    (state) => state.secondStageInfoObject
  );

  const setSecondStageInfoObject = usePaymentSecondStage(
    (state) => state.setSecondStageInfoObject
  );

  const handleChangeUserNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSecondStageInfoObject({
      ...secondStageInfoObject,
      userName: event.target.value,
    });
  };

  const handleChangeUserPhoneNumberInput = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSecondStageInfoObject({
      ...secondStageInfoObject,
      phoneNumber: formatPhoneNumber(event.target.value),
    });
  };

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
          onChange={handleChangeUserNameInput}
          placeholder="예약자명 입력"
          className="title4 w-[80%] border-b-[1px] border-grey3 !leading-[1.4] !tracking-[-0.02em] p-1"
        />
      </div>
      <div className="w-sevenEightWidth flex justify-between items-center gap-x-6">
        <span className="w-[40px] flex gap-x-[1px] items-center title4 text-grey6 ">
          {'연락처'}
          <div className="h-full title4 text-status_red1">*</div>
        </span>
        <input
          type="number"
          value={phoneNumber}
          onChange={handleChangeUserPhoneNumberInput}
          placeholder="휴대폰 번호 입력"
          className="body4 placeholder:text-[12px] placeholder:font-medium placeholder:leading-[1.4] placeholder:tracking-[-0.02em] placeholder:text-grey3 w-[80%] border-b-[1px] border-grey3 p-1"
        />
      </div>
    </div>
  );
}
