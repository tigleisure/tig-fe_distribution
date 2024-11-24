import { categoryMapEngToKor } from '@constant/constant';
import { cn } from '@utils/cn';
import { formatDate } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { Club } from 'types/response/response';

export default function HomeCard({
  clubName,
  address,
  category,
  imageUrls,
  clubId,
}: Club) {
  const isEventCard = false;
  return (
    <Link
      className="w-[152px] flex flex-col gap-[6px] shrink-0"
      href={`/detail-page/${clubId}?date=${formatDate(
        new Date(),
        "yyyy-MM-dd'T'HH:mm:ss"
      )}`}
    >
      <div className="relative w-[152px] h-[152px] rounded-[10px] overflow-hidden">
        <Image
          src={imageUrls.length !== 0 ? imageUrls[0] : '/png/dummyImage.png'}
          alt={clubName}
          fill
        />
      </div>
      <div className="flex gap-[6px] mt-[6px]">
        <p className="title3 text-grey7 line-clamp-1 w-fit">{clubName}</p>
        <p className="body4 text-grey5 shrink-0">
          {categoryMapEngToKor[category]}
        </p>
      </div>
      <div
        className={cn('w-fit line-clamp-1', {
          'bg-primary_orange2 text-primary_orange1 title3 flex justify-center items-center px-[8px] py-[6px] rounded-[6px]':
            isEventCard,
          'text-grey6 body4': !isEventCard,
        })}
      >
        {address}
      </div>
    </Link>
  );
}
