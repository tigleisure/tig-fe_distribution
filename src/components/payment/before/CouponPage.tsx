'use client';
import useCoupon from '@store/couponStore';
import { useState, useEffect } from 'react';
import Header from '@components/all/Header';
import { cn } from '@utils/cn';
import FullButton from '@components/all/FullButton';
import ChevronDownSVG from '@public/svg/chevronDown.svg';

interface couponDetail {
  discountPrice: number;
  couponDescription: string;
  isValid: boolean;
  couponExpireDate: string;
}

interface couponItemDetail extends couponDetail {
  selectedCouponNumber: number;
  handleClickCoupon: (st: number) => void;
  couponIndex: number;
}

export default function CouponPage() {
  const couponList = useCoupon((state) => state.couponList);
  const setCouponList = useCoupon((state) => state.setCouponList);
  const [selectedCouponNumber, setselectedCouponNumber] = useState<number>(-1);

  useEffect(() => {
    // 원래는 백엔드로부터 쿠폰 리스트들을 받아오는 로직이 존재
    const DUMMYCOUPONDATA: couponDetail[] = [
      {
        discountPrice: 7000,
        couponDescription: '[티그 첫 고객 이벤트] 쿠폰 내용 어쩌구....',
        isValid: true,
        couponExpireDate: '2024-10-10',
      },
      {
        discountPrice: 7000,
        couponDescription: '[티그 첫 고객 이벤트] 쿠폰 내용 어쩌구....',
        isValid: true,
        couponExpireDate: '2024-10-10',
      },
      {
        discountPrice: 6000,
        couponDescription: '[티그 첫 고객 이벤트] 쿠폰 내용 어쩌구....',
        isValid: false,
        couponExpireDate: '2024-10-11',
      },
      {
        discountPrice: 5000,
        couponDescription: '[티그 첫 고객 이벤트] 쿠폰 내용 어쩌구....',
        isValid: true,
        couponExpireDate: '2024-10-12',
      },
      {
        discountPrice: 4000,
        couponDescription: '[티그 첫 고객 이벤트] 쿠폰 내용 어쩌구....',
        isValid: false,
        couponExpireDate: '2024-10-13',
      },
      {
        discountPrice: 3000,
        couponDescription: '[티그 첫 고객 이벤트] 쿠폰 내용 어쩌구....',
        isValid: true,
        couponExpireDate: '2024-10-14',
      },
    ];

    setCouponList(DUMMYCOUPONDATA);
  }, []);

  return (
    <main className="w-full h-full flex flex-col items-center bg-grey1 overflow-y-scroll">
      <Header buttonType="back" isCenter={false} title="쿠폰" bgColor="grey" />
      <div className="w-full h-fit mt-[68px] flex justify-start items-center pl-5 py-[10px] body4 text-grey5">
        보유 쿠폰 {couponList.length}장
      </div>
      <div className="w-full h-fit flex flex-col items-center pb-[100px]">
        {couponList.map((coupon, index) => (
          <CouponItem
            key={index}
            discountPrice={coupon.discountPrice}
            couponDescription={coupon.couponDescription}
            isValid={coupon.isValid}
            couponExpireDate={coupon.couponExpireDate}
            selectedCouponNumber={selectedCouponNumber}
            handleClickCoupon={setselectedCouponNumber}
            couponIndex={index}
          />
        ))}
      </div>
      {selectedCouponNumber === -1 ? (
        <FullButton
          size="lg"
          color="white"
          bgColor="grey3"
          content="적용하기"
          className="absolute bottom-[30px] !w-eightNineWidth"
        />
      ) : (
        <FullButton
          size="lg"
          color="white"
          bgColor="primary_orange1"
          content="적용하기"
          className="absolute bottom-[30px] !w-eightNineWidth"
          clickTask="apply-coupon"
          sendingData={{
            selectedCouponPrice: couponList[selectedCouponNumber].discountPrice,
            // 추후에는 필요에 따라 쿠폰의 가격 뿐만 아니라 id까지 적용시킬 수도 있음
          }}
        />
      )}
    </main>
  );
}

function CouponItem({
  discountPrice,
  couponDescription,
  isValid,
  couponExpireDate,
  selectedCouponNumber,
  handleClickCoupon,
  couponIndex,
}: couponItemDetail) {
  return (
    <section
      className={cn(
        'w-eightNineWidth h-fit rounded-[10px] flex flex-col items-center gap-y-5 bg-white mb-[10px] py-5',
        {
          'shadow-myPageLogoutButton': isValid,
        }
      )}
    >
      <div
        className={cn(
          'w-sevenEightWidth flex justify-start items-center title1',
          {
            'text-black': isValid,
            'text-grey3': !isValid,
          }
        )}
      >
        {discountPrice}원
      </div>
      <div className="w-sevenEightWidth flex justify-between items-center">
        <span
          className={cn('body4', {
            'text-grey7': isValid,
            'text-grey3': !isValid,
          })}
        >
          {couponDescription}
        </span>
        {selectedCouponNumber === couponIndex ? (
          <div
            className="w-7 h-7 flex justify-center items-center rounded-[50%] bg-primary_orange1 hover:cursor-pointer"
            onClick={() => handleClickCoupon(-1)}
          >
            <ChevronDownSVG />
          </div>
        ) : (
          <div
            className={cn(
              'w-7 h-7 rounded-[50%] border-[1px] shadow-writingReviewInput',
              {
                disabled: !isValid,
              }
            )}
            onClick={() => {
              if (isValid) {
                handleClickCoupon(couponIndex);
              } else {
                return;
              }
            }}
          />
        )}
      </div>
      <div
        className={cn(
          'w-sevenEightWidth flex justify-start items-center body4',
          {
            'text-grey4': isValid,
            'text-grey3': !isValid,
          }
        )}
      >
        {couponExpireDate}까지 사용 가능
      </div>
    </section>
  );
}
