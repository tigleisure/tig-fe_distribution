import InfoSvg from '@public/svg/mypage/info.svg';

export default function ReservationInfoCard() {
  return (
    <div className="w-full rounded-[12px] px-3 py-4 flex flex-col gap-1 border border-grey3 bg-grey2">
      <div className="flex gap-3 items-center">
        <InfoSvg />
        <p className="title3 text-grey7">
          1명이 여러 게임을 하는 경우에도 총 게임 수를 선택해주세요.
        </p>
      </div>
      <p className="body4 text-grey5 ml-[32px]">
        예) 1명이 3게임 = 3게임 선택 / 3명이 1게임씩 = 3게임 선택
      </p>
    </div>
  );
}
