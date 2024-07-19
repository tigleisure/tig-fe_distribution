import TossLogoSVG from '@public/svg/payment/before/tossLogo.svg';
import NaverPaymentLogoSVG from '@public/svg/payment/before/naverPaymentLogo.svg';
import KakaoPaymentLogoSVG from '@public/svg/payment/before/kakaoPaymentLogo.svg';

export default function BeforeSecondStagePaymentSelectionCard() {
  return (
    <div className="w-full h-fit flex flex-col gap-y-5 items-center bg-white rounded-[10px] py-5">
      <div className="w-sevenEightWidth flex justify-start items-center">
        <span className="title3 text-grey7">결제수단</span>
      </div>
      <div className="w-sevenEightWidth border-b-[1px] border-grey2" />
      <section className="w-sevenEightWidth flex flex-col gap-y-[10px]">
        <div className="flex items-center py-5 gap-x-[10px]">
          <TossLogoSVG />
          <div className="body4 text-grey7">토스 및 카드 결제</div>
        </div>
        <div className="flex items-center py-5 gap-x-[10px]">
          <NaverPaymentLogoSVG />
          <div className="body4 text-grey7">네이버페이</div>
        </div>
        <div className="flex items-center py-5 gap-x-[10px]">
          <KakaoPaymentLogoSVG />
          <div className="body4 text-grey7">카카오페이</div>
        </div>
      </section>
    </div>
  );
}
