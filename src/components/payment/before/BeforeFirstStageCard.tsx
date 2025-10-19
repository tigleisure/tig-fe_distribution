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
  gameDescription: string;
  gameType: string;
  endDate: string;
  travelType: string;
  departureDate: string;
  returnDate: string;
  departurePlace: string;
  returnPlace: string;
  receiptDate: string;
  deliveryAddress: string;
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
  gameDescription,
  gameType,
  endDate,
  travelType,
  departureDate,
  returnDate,
  departurePlace,
  returnPlace,
  receiptDate,
  deliveryAddress,
}: BeforeFirstStageCardProps) {
  return (
    <section className="w-eightNineWidth h-fit rounded-[10px] flex justify-center bg-white mt-[30px] py-5">
      <div className="w-sevenEightWidth h-fit flex flex-col gap-y-5">
        <p className="w-full h-fit flex flex-col gap-y-1 items-start">
          <span className="title3 text-grey7">{clubName}</span>
          <span className="body4 text-grey5">{clubAddress}</span>
        </p>
        <div className="w-full border-b-[1px] border-grey2" />
        {gameType === 'BUS' && (
          <div className="w-full flex justify-between items-center">
            <span className="title4 text-grey4">여행 유형</span>
            <span className="body4 text-grey6">{travelType}</span>
          </div>
        )}
        {gameType === 'BUS' && (
          <div className="w-full flex justify-between items-center">
            <span className="title4 text-grey4">가는 날</span>
            <span className="body4 text-grey6">
              {departurePlace} {formatReservationShowingDate(departureDate)}{' '}
              {extractOnlyTime(departureDate)}
            </span>
          </div>
        )}
        {gameType === 'BUS' && travelType === '왕복' && (
          <div className="w-full flex justify-between items-center">
            <span className="title4 text-grey4">오는 날 </span>
            <span className="body4 text-grey6">
              {returnPlace} {formatReservationShowingDate(returnDate)}{' '}
              {extractOnlyTime(returnDate)}
            </span>
          </div>
        )}
        {gameType !== 'BUS' && gameType !== 'GROUP_UNIFORM' && (
          <div className="w-full flex justify-between items-center">
            <span className="title4 text-grey4">날짜</span>
            <span className="body4 text-grey6">
              {gameType === 'PENSION'
                ? formatReservationShowingDate(date) +
                  ' - ' +
                  formatReservationShowingDate(endDate)
                : gameType === 'CATERING' || gameType === 'LUNCH_BOX'
                ? formatReservationShowingDate(receiptDate)
                : formatReservationShowingDate(startTime)}
            </span>
          </div>
        )}
        {(gameType === 'CATERING' || gameType === 'LUNCH_BOX') && (
          <div className="w-full flex justify-between items-center">
            <span className="title4 text-grey4">수령 시간</span>
            <span className="body4 text-grey6">
              {extractOnlyTime(receiptDate)}
            </span>
          </div>
        )}
        {(gameType === 'CATERING' || gameType === 'LUNCH_BOX' || gameType === 'GROUP_UNIFORM') && (
          <div className="w-full flex justify-between items-center">
            <span className="title4 text-grey4">주소</span>
            <span className="body4 text-grey6">{deliveryAddress}</span>
          </div>
        )}
        {gameType !== 'PENSION' &&
          gameType !== 'BUS' &&
          gameType !== 'CATERING' &&
          gameType !== 'LUNCH_BOX' &&
          gameType !== 'GROUP_UNIFORM' && (
            <div className="w-full flex justify-between items-center">
              <span className="title4 text-grey4">시작 시간</span>
              <span className="body4 text-grey6">
                {/* {parseInt(extractOnlyTime(startTime).slice(0, 2)) <= 12
              ? '오전'
              : '오후'}{' '} */}
                {extractOnlyTime(startTime) + ' 시작'}
                {/* {endTime === '' ? '시작' : '- '} */}
                {/* {endTime ? extractOnlyTime(endTime) : null} */}
              </span>
            </div>
          )}
        {gameType !== 'BUS' && gameType !== 'GROUP_UNIFORM' && (
          <div className="w-full flex justify-between items-center">
            <span className="title4 text-grey4">인원</span>
            <span className="body4 text-grey6">
              {adultCount !== 0 && `${adultCount}명`}
            </span>
          </div>
        )}
        {gameType !== 'PENSION' && gameType !== 'LUNCH_BOX' && (
          <div className="w-full flex justify-between items-center">
            {gameType === 'GOLF_COURSE' ||
            gameType === 'BUS' ||
            gameType === 'CATERING' ? (
              <>
                <span className="title4 text-grey4">옵션</span>
                <span className="body4 text-grey6">{gameDescription}</span>
              </>
            ) : gameType === 'GROUP_UNIFORM' ? (
              <>
                <span className="title4 text-grey4">수량</span>
                <span className="body4 text-grey6">{gameDescription}</span>
              </>
            ) : (
              <>
                <span className="title4 text-grey4">게임</span>
                <span className="body4 text-grey6">{gameDescription}</span>
              </>
            )}
          </div>
        )}
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
              {price && price.toLocaleString()}{' '}
              <span className="title3 text-status_red1">원</span>
            </span>
            <span className="caption4 text-grey3">세금 및 수수료 포함</span>
          </div>
        </div>
      </div>
    </section>
  );
}
