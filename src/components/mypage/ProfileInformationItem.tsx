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
      className={`w-full h-fit flex justify-between items-center gap-x-[${wholeGap}px]`}
    >
      <div
        className={`flex justify-between items-center gap-x-[${labelGap}px]`}
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
