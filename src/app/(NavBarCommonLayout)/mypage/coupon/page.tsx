'use client';
import { usePostCoupon } from '@apis/mypage/postCoupon';
import { useGetCoupon } from '@apis/payment/before/getCoupon';
import MypageFooter from '@components/all/Footer/MypageFooter';
import FullButton from '@components/all/FullButton';
import Header from '@components/all/Header';
import { SearchInput } from '@components/all/SearchInput';
import ToastUI, { toastUIDuration } from '@components/all/ToastUI';
import { CouponItem } from '@components/mypage/CouponItem';
import NonLoginIconSVG from '@public/svg/nonLogin/nonLoginIcon.svg';
import { cn } from '@utils/cn';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Page() {
  const { data: couponList } = useGetCoupon();
  const [couponCode, setCouponCode] = useState('');
  const { mutate } = usePostCoupon();
  const [toastId, setToastId] = useState<string | null>(null);
  console.log(toastId);

  const SubmitCoupon = () => {
    setCouponCode('');
    mutate(
      { couponId: couponCode },
      {
        onSuccess(data, variables, context) {
          console.log('data', data);
          if (data.resultCode === 200) {
            if (toastId !== null) {
              toast.remove(toastId);
            }
            const id = toast.custom(
              <ToastUI message="쿠폰이 등록되었어요" iswarning={false} />,
              {
                duration: toastUIDuration,
              }
            );

            setToastId(id);
          } else {
            console.log('fail');
            if (toastId !== null) {
              toast.remove(toastId);
            }
            const id = toast.custom(
              <ToastUI
                message="유효하지 않은 쿠폰 번호에요"
                iswarning={true}
              />,
              {
                duration: toastUIDuration,
              }
            );

            setToastId(id);
          }
        },
      }
    );
  };

  if (couponList.result.length > 0) {
    return (
      <div className="bg-grey1 w-full h-[calc(100%-160px)] flex flex-col items-center overflow-y-scroll">
        <div className="w-eightNineWidth flex gap-5 mt-[68px] py-4">
          <input
            placeholder="쿠폰코드를 입력해주세요"
            className="w-full bg-white p-3 border border-grey3 placeholder-grey5 rounded-[50px] body3 h-[38px]"
            onChange={(e) => setCouponCode(e.target.value)}
            value={couponCode}
            onKeyDown={(e) => {
              e.key === 'Enter' && SubmitCoupon();
            }}
          />
          <button
            className={cn(
              'w-[60px] rounded-[6px] h-full border border-black title4',
              {
                'bg-primary_orange1 text-white border-none':
                  couponCode.length > 0,
              }
            )}
            onClick={SubmitCoupon}
          >
            등록
          </button>
        </div>
        <Header buttonType="back" title="쿠폰" bgColor="grey" isCenter />
        <p className="body2 text-grey7 py-[10px] w-eightNineWidth">
          보유쿠폰{' '}
          <span className="text-primary_orange1 body2">
            {couponList.result.length}
          </span>
          장
        </p>
        <div className="w-full h-fit flex flex-col items-center pb-[100px]">
          {couponList.result.map((coupon, index) => (
            <CouponItem
              key={index}
              discount={coupon.discount}
              description={coupon.description}
              expireDate={coupon.expireDate}
              name={coupon.name}
              couponId={coupon.couponId}
            />
          ))}
        </div>
        <MypageFooter />
        <Toaster
          position="bottom-center"
          containerStyle={{ bottom: '100px' }}
        />
      </div>
    );
  }

  return (
    <div className="bg-grey1 w-full h-[calc(100%-160px)] flex flex-col items-center">
      <Header buttonType="back" title="쿠폰" bgColor="grey" isCenter />
      <p className="body2 text-grey7 px-5 py-[10px] mt-[68px] w-full mb-[40px]">
        보유쿠폰 <span className="text-primary_orange1 body2">0</span>장
      </p>
      <NonLoginIconSVG />
      <p className="title2 text-grey4 pt-5">사용가능한 쿠폰이 없어요</p>
      <MypageFooter />
      <Toaster position="bottom-center" containerStyle={{ bottom: '100px' }} />
    </div>
  );
}
