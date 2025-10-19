import { cn } from '@utils/cn';
import { formatDate } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { Package } from 'types/response/response';

const categoryMapEngToKor: Record<string, string> = {
  BUS: '버스',
  CATERING: '케이터링',
  LUNCH_BOX: '도시락',
  GROUP_UNIFORM: '단체복',
  PENSION: '펜션',
  GOLF_COURSE: '골프장',
};

export default function PackageCard({
  name,
  address,
  category,
  imageUrls,
  id,
}: Package) {
  const isEventCard = false;
  return (
    <Link
      className="w-[152px] flex flex-col gap-[6px] shrink-0"
      href={`/detail-page/${id}?date=${formatDate(
        new Date(),
        "yyyy-MM-dd'T'HH:mm:ss"
      )}&from=package`}
    >
      <div className="relative w-[152px] h-[152px] rounded-[10px] overflow-hidden">
        <Image
          src={imageUrls ? imageUrls[0] : '/png/dummyImage.png'}
          alt={name}
          fill
        />
      </div>
      <div className="flex gap-[6px] mt-[6px]">
        <p className="title3 text-grey7 line-clamp-1 w-fit">{name}</p>
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
