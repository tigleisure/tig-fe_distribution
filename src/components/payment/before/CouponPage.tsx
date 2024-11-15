'use client';
import useCoupon, { useSelectedCouponNumber } from '@store/couponStore';
import { useState, useEffect } from 'react';
import Header from '@components/all/Header';
import { cn } from '@utils/cn';
import FullButton from '@components/all/FullButton';
import ChevronDownSVG from '@public/svg/chevronDown.svg';
import { useGetCoupon } from '@apis/payment/before/getCoupon';

interface couponDetail {
  discount: number;
  description: string;
  isValid: boolean;
  expireDate: string;
  couponId: number;
  name: string;
}

interface couponItemDetail extends couponDetail {
  selectedCouponNumber: number;
  handleCancelCoupon: (st: boolean) => void;
  handleClickCoupon: (st: number) => void;
  couponIndex: number;
}

export default function CouponPage() {
  const couponList = useCoupon((state) => state.couponList);
  const setCouponList = useCoupon((state) => state.setCouponList);
  const { data, isSuccess } = useGetCoupon();
  const [isCouponCancel, setIsCouponCancel] = useState<boolean>(false);
  const selectedCouponNumber = useSelectedCouponNumber(
    (state) => state.selectedCouponNumber
  );
  const setSelectedCouponNumber = useSelectedCouponNumber(
    (state) => state.setSelectedCouponNumber
  );

  useEffect(() => {
    // 원래는 백엔드로부터 쿠폰 리스트들을 받아오는 로직이 존재
    if (isSuccess) {
      const newCouponList = data.result.map((coupon: any) => {
        return { ...coupon, isValid: true };
      });
      console.log(newCouponList);
      setCouponList(newCouponList);
    }
  }, [data]);

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
            discount={coupon.discount}
            description={coupon.description}
            isValid={coupon.isValid}
            expireDate={coupon.expireDate}
            name={coupon.name}
            couponId={coupon.couponId}
            selectedCouponNumber={selectedCouponNumber}
            handleClickCoupon={setSelectedCouponNumber}
            handleCancelCoupon={setIsCouponCancel}
            couponIndex={coupon.couponId}
          />
        ))}
      </div>
      {selectedCouponNumber === -1 ? (
        isCouponCancel ? (
          <FullButton
            size="lg"
            color="white"
            bgColor="primary_orange1"
            content="적용 취소하기"
            className="absolute bottom-[30px] !w-eightNineWidth"
            clickTask="apply-coupon"
            sendingData={{
              selectedCouponPrice: 0,
            }}
          />
        ) : (
          <FullButton
            size="lg"
            color="white"
            bgColor="grey3"
            content="적용하기"
            className="absolute bottom-[30px] !w-eightNineWidth"
          />
        )
      ) : (
        <FullButton
          size="lg"
          color="white"
          bgColor="primary_orange1"
          content="적용하기"
          className="absolute bottom-[30px] !w-eightNineWidth"
          clickTask="apply-coupon"
          sendingData={{
            selectedCouponPrice:
              couponList.find(
                (coupon) => coupon.couponId === selectedCouponNumber
              )?.discount || 0,
            // 추후에는 필요에 따라 쿠폰의 가격 뿐만 아니라 id까지 적용시킬 수도 있음
          }}
        />
      )}
    </main>
  );
}

function CouponItem({
  discount,
  description,
  isValid,
  name,
  expireDate,
  selectedCouponNumber,
  handleClickCoupon,
  handleCancelCoupon,
  couponIndex,
}: couponItemDetail) {
  return (
    <section
      className={cn(
        'w-eightNineWidth h-fit rounded-[10px] flex flex-col items-center gap-y-5 bg-white mb-[10px] py-5 hover:cursor-pointer',
        {
          'shadow-myPageLogoutButton': selectedCouponNumber === couponIndex,
        }
      )}
      onClick={() => {
        if (isValid) {
          if (selectedCouponNumber === couponIndex) {
            handleClickCoupon(-1);
            handleCancelCoupon(true);
          } else {
            handleClickCoupon(couponIndex);
            handleCancelCoupon(false);
          }
        } else {
          return;
        }
      }}
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
        {discount.toLocaleString()}원
      </div>
      <div className="w-sevenEightWidth flex justify-between items-center">
        <span
          className={cn('body4', {
            'text-grey7': isValid,
            'text-grey3': !isValid,
          })}
        >
          [{name}] {description}
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
        {expireDate}까지 사용 가능
      </div>
    </section>
  );
}
