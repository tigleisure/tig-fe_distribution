interface BeforeSecondStageCardProps {
  userName: string;
  phoneNumber: string | null;
  couponDiscountPrice: number;
  defaultPrice: number; // 기존의 예약 금액을 의미함
}

interface BeforeSecondStageUserInfoCardProps {
  userName: string;
  phoneNumber: string | null;
}

interface BeforeSecondStageCouponCardProps {
  isDiscountCouponAvailable: boolean; // 사용 가능한 쿠폰이 남아 있는지를 조회하는 속성
  couponDiscountPrice: number;
}

interface BeforeSecondStageFinalPriceCardProps {
  couponDiscountPrice: number;
  defaultPrice: number;
}

export default function BeforeSecondStageCard({
  userName,
  phoneNumber,
  couponDiscountPrice,
  defaultPrice,
}: BeforeSecondStageCardProps) {
  return (
    <section className="w-eightNineWidth h-fit  flex flex-col gap-y-[10px] mt-[30px] mb-[30px]">
      <BeforeSecondStageUserInfoCard
        userName={userName}
        phoneNumber={phoneNumber}
      />
      <BeforeSecondStageCouponCard
        isDiscountCouponAvailable={true}
        couponDiscountPrice={0}
      />
      <BeforeSecondStageFinalPriceCard
        couponDiscountPrice={couponDiscountPrice}
        defaultPrice={defaultPrice}
      />
    </section>
  );
}

function BeforeSecondStageUserInfoCard({
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

function BeforeSecondStageCouponCard({
  isDiscountCouponAvailable,
  couponDiscountPrice,
}: BeforeSecondStageCouponCardProps) {
  return (
    <div className="w-full h-fit rounded-[10px] flex flex-col items-center py-5 gap-y-5 bg-white">
      <div className="w-sevenEightWidth title3 text-grey7">쿠폰 할인</div>
      <div className="w-sevenEightWidth border-b-[1px] border-grey2" />
      <div className="w-sevenEightWidth flex justify-between items-center">
        <div className="w-fit h-full flex justify-between items-center gap-x-5">
          <span className="title4 text-grey6">일반 쿠폰</span>
          {!isDiscountCouponAvailable && (
            <span className="body4 text-grey3">
              적용 가능한 쿠폰이 없습니다.
            </span>
          )}
          {isDiscountCouponAvailable && (
            <button className="px-[10px] w-fit h-full py-1 bg-black text-white title4 rounded-[6px]">
              사용하기
            </button>
          )}
        </div>
        <span className="body4 text-grey6">-{couponDiscountPrice}원</span>
      </div>
    </div>
  );
}

function BeforeSecondStageFinalPriceCard({
  couponDiscountPrice,
  defaultPrice,
}: BeforeSecondStageFinalPriceCardProps) {
  return (
    <div className="w-full h-fit rounded-[10px] flex flex-col py-5 items-center gap-y-5 bg-white shadow-myPageLogoutButton">
      <div className="w-sevenEightWidth h-fit flex justify-start items-center title3 text-grey7">
        최종 결제 금액
      </div>
      <div className="w-sevenEightWidth border-b-[1px] border-grey2" />
      <div className="w-sevenEightWidth flex justify-between items-center">
        <span className="title4 text-grey4">예약 금액</span>
        <span className="body4 text-grey6">{defaultPrice}원</span>
      </div>
      <div className="w-sevenEightWidth flex justify-between items-center">
        <span className="title4 text-grey4">쿠폰 할인 금액</span>
        <span className="body4 text-grey6">-{couponDiscountPrice}원</span>
      </div>
      <div className="w-sevenEightWidth border-b-[1px] border-grey4s" />
      <div className="w-sevenEightWidth h-fit flex flex-col gap-y-[6px]">
        <div className="w-full flex justify-between items-center">
          <span className="title4 text-grey6">총 결제 금액</span>
          <div className=" flex items-center headline2 text-status_red1">
            {defaultPrice - couponDiscountPrice}
            <span className="title3 text-status_red1">원</span>
          </div>
        </div>
        <div className="w-full flex justify-end items-center caption4 text-grey3">
          세금 및 수수료 포함
        </div>
      </div>
    </div>
  );
}
