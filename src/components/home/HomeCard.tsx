import { cn } from '@utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { type HomeCardProps } from 'types/home/HomeTypes';

export default function HomeCard({
  isEventCard = false,
  clubName,
  subtitle,
  gameType,
  image,
  id,
}: HomeCardProps) {
  return (
    <Link
      className="w-[152px] flex flex-col gap-[6px] shrink-0"
      href={`/detail-page/${id}`}
    >
      <Image src={image} alt={clubName} width={152} height={152} />
      <div className="flex gap-[6px] mt-[6px]">
        <p className="title3 text-grey7">{clubName}</p>
        <p className="body4 text-grey5">{gameType}</p>
      </div>
      <div
        className={cn('w-fit', {
          'bg-primary_orange2 text-primary_orange1 title3 flex justify-center items-center px-[8px] py-[6px] rounded-[6px]':
            isEventCard,
          'text-grey6 body4': !isEventCard,
        })}
      >
        {subtitle}
      </div>
    </Link>
  );
}
