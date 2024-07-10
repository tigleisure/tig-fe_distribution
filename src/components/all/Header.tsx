'use client';
import ArrowLeftSVG from '@public/svg/arrowLeft.svg';
import CloseSVG from '@public/svg/close.svg';
import { cn } from '@utils/cn';
import { useRouter } from 'next/navigation';
import useModal from '@store/modalStore';
import { useIsCouponPageOpen } from '@store/couponStore';
import useSearchModal from '@store/searchModalStore';

interface HeaderProps {
  buttonType: 'back' | 'close';
  isCenter?: boolean;
  title: string;
  bgColor?: 'white' | 'grey';
  className?: string;
  isReviewSubmitted?: boolean;
  isSearchModal?: boolean;
}

export default function Header({
  buttonType,
  isCenter = false,
  title,
  className,
  bgColor = 'white',
  isReviewSubmitted = false,
  isSearchModal = false,
}: HeaderProps) {
  const router = useRouter();
  const setIsOpen = useModal((state) => state.setSelectedIsModalOpen);
  const setIsSearchModalOpen = useSearchModal(
    (state) => state.setSelectedIsSearchModalOpen
  );
  const setIsCouponPageOpen = useIsCouponPageOpen(
    (state) => state.setIsCouponPageOpen
  );
  return (
    <header
      className={cn(
        'w-full h-[68px] flex items-center absolute top-0 title2 text-grey7 text-base bg-white',
        {
          'justify-center': isCenter,
          'pl-[50px]': !isCenter,
          'bg-grey1': bgColor === 'grey',
        },
        className
      )}
    >
      <div
        className="w-[44px] h-[44px] flex items-center justify-center absolute left-0 cursor-pointer"
        onClick={() => {
          if (title === '리뷰 작성' && isReviewSubmitted === true) {
            router.push('/');
            return;
          }

          if (title === '리뷰 작성') {
            setIsOpen(true);
            return;
          }

          if (title === '쿠폰') {
            setIsCouponPageOpen(false);
            return;
          }

          if (title === '예약 결제') {
            router.replace('/');
          }

          if (isSearchModal) {
            setIsSearchModalOpen(false);
            return;
          }

          router.back();
        }}
      >
        {buttonType === 'back' ? <ArrowLeftSVG /> : <CloseSVG />}
      </div>
      <p className="mt-[4px]">{title}</p>
    </header>
  );
}
