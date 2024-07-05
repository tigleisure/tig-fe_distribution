import { cn } from '@utils/cn';
import { ProfileInformationItemProps } from 'types/mypage/MyPageTypes';

export default function ProfileInformationItem({
  wholeGap,
  labelGap,
  labelName,
  placeholderName,
  placeholderColor,
  isButtonBorder,
  buttonText,
}: ProfileInformationItemProps) {
  return (
    <div
      className={cn('w-full h-fit flex justify-between items-center', {
        'gap-x-[156px]': wholeGap === 156,
        'gap-x-[59px]': wholeGap === 59,
        'gap-x-[108px]': wholeGap === 108,
      })}
    >
      <div
        className={cn('flex justify-between items-center', {
          'gap-x-[63px]': labelGap === 63,
          'gap-x-[33px]': labelGap === 33,
          'gap-x-[53px]': labelGap === 53,
        })}
      >
        <span className="caption2 text-grey5">{labelName}</span>
        <span
          className={cn('body4', {
            'text-grey7': placeholderColor === 'grey7',
            'text-grey3': placeholderColor === 'grey3',
          })}
        >
          {placeholderName}
        </span>
      </div>
      <button
        className={cn(
          'w-fit h-fit rounded-md title4',
          {
            'text-grey7 bg-white shadow-mypageButton': isButtonBorder,
            'text-white bg-primary_orange1': !isButtonBorder,
          },
          'px-[14px] py-[8px]'
        )}
      >
        {buttonText}
      </button>
    </div>
  );
}
