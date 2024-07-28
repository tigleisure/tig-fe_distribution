import {
  formatReservationShowingDate,
  extractOnlyTime,
} from '@utils/formatDate';

interface BeforeFirstStageCardProps {
  clubName: string;
  clubAddress: string;
  date: string;
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
  startTime: string;
  endTime?: string;
  gameCount?: number;
  price: number;
}

export default function BeforeFirstStageCard({
  clubName,
  clubAddress,
  date,
  adultCount,
  teenagerCount,
  kidsCount,
  startTime,
  endTime,
  gameCount,
  price,
}: BeforeFirstStageCardProps) {
  return (
    <section className="w-eightNineWidth h-fit rounded-[10px] flex justify-center bg-white mt-[30px] py-5">
      <div className="w-sevenEightWidth h-fit flex flex-col gap-y-5">
        <p className="w-full h-fit flex flex-col gap-y-1 items-start">
          <span className="title3 text-grey7">{clubName}</span>
          <span className="body4 text-grey5">{clubAddress}</span>
        </p>
        <div className="w-full border-b-[1px] border-grey2" />
        <div className="w-full flex justify-between items-center">
          <span className="title4 text-grey4">날짜</span>
          <span className="body4 text-grey6">
            {formatReservationShowingDate(date)}
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="title4 text-grey4">인원</span>
          <span className="body4 text-grey6">
            {adultCount !== 0 && `성인 ${adultCount}명`}
            {adultCount !== 0 && (teenagerCount || kidsCount) !== 0 && ', '}
            {teenagerCount !== 0 && `청소년 ${teenagerCount}명`}
            {teenagerCount !== 0 && kidsCount !== 0 && ', '}
            {kidsCount !== 0 && `어린이 ${kidsCount}명`}
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="title4 text-grey4">이용 시간</span>
          <span className="body4 text-grey6">
            {/* {parseInt(extractOnlyTime(startTime).slice(0, 2)) <= 12
              ? '오전'
              : '오후'}{' '} */}
            {extractOnlyTime(startTime)} {endTime === '' ? '시작' : '- '}
            {endTime ? extractOnlyTime(endTime) : null}
          </span>
        </div>
        {endTime === '' && gameCount !== 0 && (
          <div className="w-full flex justify-between items-center">
            <span className="title4 text-grey4">게임수</span>
            <span className="body4 text-grey6">{gameCount}게임</span>
          </div>
        )}
        <div className="w-full border-b-[1px] border-grey4" />
        <div className="w-full h-fit flex justify-between gap-x-[126px]">
          <span className="title4 text-grey6">총 결제 금액</span>
          <div className="w-fit h-fit flex flex-col items-end gap-y-[6px]">
            <span className="headline2 text-status_red1">
              {price.toLocaleString()}{' '}
              <span className="title3 text-status_red1">원</span>
            </span>
            <span className="caption4 text-grey3">세금 및 수수료 포함</span>
          </div>
        </div>
      </div>
    </section>
  );
}
