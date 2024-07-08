import { cn } from '@utils/cn';

interface GameSelectCardProps {
  disable?: boolean;
  selected: boolean;
  time: string;
  onClick: (i: number) => void;
  idx: number;
}

export default function GameSelectCard({
  disable = false,
  selected,
  time,
  onClick,
  idx,
}: GameSelectCardProps) {
  return (
    <button
      className={cn(
        'w-gameCardWidth h-[40px] body1 flex justify-center items-center shadow-myPageLogoutButton text-grey6 rounded-[8px]',
        {
          'bg-grey3 text-white cursor-not-allowed shadow-none': disable,
          'bg-primary_orange1 text-white shadow-none': selected,
        }
      )}
      onClick={() => onClick(idx)}
      disabled={disable}
    >
      {time}
    </button>
  );
}
