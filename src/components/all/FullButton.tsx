import { cn } from '@utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'sm' | 'md' | 'lg'
  color: 'status_red1' | 'primary_orange1' | 'white' | 'grey5' | 'black'| 'grey4';
  bgColor: 'primary_orange1' | 'primary_orange2' | 'black' | 'grey2' | 'white' | 'status_red1';
  content: string;
  className?: string;
}

export default function FullButton({ size, color, bgColor, content, className, ...props }: ButtonProps) {
  const colorClasses = {
    status_red1: 'text-status_red1',
    primary_orange1: 'text-primary_orange1',
    white: 'text-white',
    grey5: 'text-grey5',
    black: 'text-black',
    grey4: 'text-grey4',
  };

  const bgColorClasses = {
    primary_orange1: 'bg-primary_orange1',
    primary_orange2: 'bg-primary_orange2',
    black: 'bg-black',
    grey2: 'bg-grey2',
    white: 'bg-white',
    status_red1: 'bg-status_red1',
  };
  return (
    <button className={cn(`w-full flex justify-center items-center rounded-md`,
      {
        'body4 h-[37px]': size === 'sm',
        'title3 h-[44px]': size === 'md',
        'title3 h-[50px]': size === 'lg',
        [colorClasses[color]]: color,
        [bgColorClasses[bgColor]]: bgColor,
      }
    ,className)} {...props}>{content}</button>
  )
}
