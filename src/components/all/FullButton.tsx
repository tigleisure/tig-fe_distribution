import { cn } from "@utils/cn"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'sm' | 'md' | 'lg'
  color: 'status_red1' | 'primary_orange1' | 'white' | 'grey5' | 'black'
  bgColor: 'primary_orange1' | 'primary_orange2' | 'black' | 'grey2' | 'white' | 'red'
  content: string;
}

export default function FullButton({ size, color, bgColor, content, ...props }: ButtonProps) {
  return (
    <button className={cn(`w-full cursor-pointer text-${color} bg-${bgColor} flex justify-center items-center rounded-md shadow-mypageButton`,
      {
        'body4 h-[37px]': size === 'sm',
        'title3 h-[44px]': size === 'md',
        'title3 h-[50px]': size === 'lg'
      }
    )} {...props}>{content}</button>
  )
}
