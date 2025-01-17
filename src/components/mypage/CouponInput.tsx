import { cn } from '@utils/cn';

interface CouponInputProps {
  couponCode: string;
  onChangeCouponCode: (value: string) => void;
  onSubmit: () => void;
}

export const CouponInput = ({
  couponCode,
  onChangeCouponCode,
  onSubmit,
}: CouponInputProps) => {
  return (
    <div className="w-eightNineWidth flex gap-5 mt-[68px] py-4">
      <input
        placeholder="쿠폰코드를 입력해주세요"
        className="w-full bg-white p-3 border border-grey3 placeholder-grey5 rounded-[50px] body3 h-[38px]"
        onChange={(e) => onChangeCouponCode(e.target.value)}
        value={couponCode}
        onKeyDown={(e) => {
          e.key === 'Enter' && onSubmit();
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
        onClick={onSubmit}
      >
        등록
      </button>
    </div>
  );
};
