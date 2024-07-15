import { categoryMapEngToKor } from '@constant/constant';
import { cn } from '@utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { Club } from 'types/response/response';

export default function HomeCard({
  clubName,
  address,
  category,
  imageUrls,
  id,
}: Club) {
  const isEventCard = false;
  return (
    <Link
      className="w-[152px] flex flex-col gap-[6px] shrink-0"
      href={`/detail-page/${id}`}
    >
      {/* 서버 더미 이미지들이 제대로 렌더링되지 못해 로컬 더미이미지 사용*/}
      <Image src={'/png/dummyImage.png'} alt={clubName} width={152} height={152} />
      <div className="flex gap-[6px] mt-[6px]">
        <p className="title3 text-grey7">{clubName}</p>
        <p className="body4 text-grey5">{categoryMapEngToKor[category]}</p>
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
