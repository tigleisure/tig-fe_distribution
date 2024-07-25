import { cn } from '@utils/cn';

interface TimeSelectCardProps {
  isFirst?: boolean;
  isLast?: boolean;
  isEven: boolean;
  isAfternoon?: boolean;
  disable?: boolean;
  selected: boolean;
  time: string;
  onClick: (i: number) => void;
  idx: number;
}
export default function TimeSelectCard({
  isFirst = false,
  isLast = false,
  isEven,
  isAfternoon = false,
  disable = false,
  selected,
  time,
  onClick,
  idx,
}: TimeSelectCardProps) {
  console.log(isEven, isLast)
  return (
    <div className="flex flex-col w-[30px] cursor-pointer">
      <p
        className={cn('caption2 text-white pb-[6px]', {
          'text-grey4': isAfternoon || isFirst,
          invisible: !(isAfternoon || isFirst),
        })}
      >
        {isAfternoon ? '오후' : isFirst ? '오전' : 'ㅇㅇ'}
      </p>
      <p
        className={cn('body4 text-white pb-[6px]', {
          'text-grey6': time.slice(3) === '00',
          invisible: time.slice(3) !== '00',
        })}
      >
        {time.slice(3) === '00' ? `${time.slice(0, 2)}시` : 'ㅇㅇ'}
      </p>
      <div className={cn("h-[4px]",{
        'border-r border-r-grey4': !isLast && isEven
      })}></div>
      <button
        className={cn(
          'w-[30px] h-[34px] bg-primary_orange2 border-r border-white',
          {
            'bg-primary_orange1': selected,
            'bg-grey3 cursor-not-allowed': disable,
            'rounded-l-[6px]': isFirst,
            'rounded-r-[6px]': isLast,
          }
        )}
        onClick={() => onClick(idx)}
        disabled={disable}
      />
    </div>
  );
}
