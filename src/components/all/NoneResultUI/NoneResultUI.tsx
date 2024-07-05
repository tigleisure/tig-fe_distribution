import { cn } from '@utils/cn';

interface NoneUIProps {
  message: string;
  subMessage: string;
  className?: string;
}

export default function NoneResultUI({
  message,
  subMessage,
  className,
}: NoneUIProps) {
  return (
    <div
      className={cn(
        'w-fit h-[46px] flex flex-col justify-between items-center gap-y-[10px]',
        className
      )}
    >
      <span className="title2 text-grey7">{message}</span>
      <span className="caption1 text-grey5">{subMessage}</span>
    </div>
  );
}
