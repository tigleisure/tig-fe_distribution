interface BeforeFirstStageCardProps {
  companyName: string;
  companyAddress: string;
  eventDate: string;
  adultCount?: number;
  youngManCount?: number;
  kidCount?: number;
  eventStartTime: string;
  eventEndTime: string;
  stageFirstPrice: number;
}

export default function BeforeFirstStageCard({
  companyName,
  companyAddress,
  eventDate,
  adultCount,
  youngManCount,
  kidCount,
  eventStartTime,
  eventEndTime,
  stageFirstPrice,
}: BeforeFirstStageCardProps) {
  return (
    <section className="w-eightNineWidth h-fit rounded-[10px] flex justify-center bg-white mt-[30px] py-5">
      <div className="w-sevenEightWidth h-fit flex flex-col gap-y-5">
        <p className="w-full h-fit flex flex-col gap-y-1 items-start">
          <span className="title3 text-grey7">{companyName}</span>
          <span className="body4 text-grey5">{companyAddress}</span>
        </p>
        <div className="w-full border-b-[1px] border-grey2" />
        <div className="w-full flex justify-between items-center">
          <span className="title text-grey4">날짜</span>
          <span className="body4 text-grey6">{eventDate}</span>
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="title text-grey4">인원</span>
          <span className="body4 text-grey6">
            {adultCount && `성인 ${adultCount}명 `}{' '}
            {youngManCount && `청소년 ${youngManCount}명 `}{' '}
            {kidCount && `어린이 ${kidCount}명`}
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="title text-grey4">이용 시간</span>
          <span className="body4 text-grey6">
            {eventStartTime} ~ {eventEndTime}
          </span>
        </div>
        <div className="w-full border-b-[1px] border-grey4" />
        <div className="w-full h-fit flex justify-between gap-x-[126px]">
          <span className="title4 text-grey6">총 결제 금액</span>
          <div className="w-fit h-fit flex flex-col items-end gap-y-[6px]">
            <span className="headline2 text-status_red1">
              {stageFirstPrice}
              <span className="title3 text-status_red1">원</span>
            </span>
            <span className="caption4 text-grey3">세금 및 수수료 포함</span>
          </div>
        </div>
      </div>
    </section>
  );
}
