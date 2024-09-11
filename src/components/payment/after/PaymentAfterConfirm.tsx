// 백엔드로부터 예약 확정 정보를 받아오는 것이면 그냥 클라이언트 컴포넌트가 되어도 상관 없음
import HistoryComponentUpperSection from '@components/all/HistoryComponentUpperSection';
import FortyEightTigSVG from '@public/svg/fortyEightTig.svg';
// 하지만 사용자가 새로고침하면 전역 상태라고 하더라도 사라지기 때문에 백엔드로부터 받아오는 것이 더 맞지 않나싶음. 아니면 zustand persists

interface paymentAfterConfirmProp {
  reservationId: string;
}

export default async function PaymentAfterConfirm({
  reservationId,
}: paymentAfterConfirmProp) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/reservation/${reservationId}`,
    { cache: 'no-store' }
  );

  const data = await response.json();

  return (
    <section className="w-eightNineWidth flex flex-col items-center gap-y-10 pt-[78px]">
      <div className="w-fit h-fit flex flex-col items-center">
        <FortyEightTigSVG />
        <span className="title2 text-grey6 mt-4 mb-2">
          예약이 신청되었습니다.
        </span>
        <div className="text-grey6 mb-[14px] caption1">
          <span className="text-grey7 headline2">확정여부를 메시지</span>로
          알려드릴게요!
        </div>
        <div className="text-grey6 caption1">
          확정까지 평균 소요 시간 :{' '}
          <span className="title2 text-primary_orange1 headline2">
            1시간 이내
          </span>
        </div>
      </div>
      <HistoryComponentUpperSection
        {...data.result}
        className="bg-white p-5"
      />
    </section>
  );
}
