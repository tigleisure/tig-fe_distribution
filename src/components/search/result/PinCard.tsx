import HamburgerSVG from '@public/svg/hamburger.svg';
import MyLocationSVG from '@public/svg/myLocation.svg';
import ResultCard from './ResultCard';
import { ResultCardProps } from 'types/search/result/searchResult';
import { useBottomSheetStore } from '@store/bottomSheetStore';

interface PinCardProps {
  PinCard: ResultCardProps;
  handleMyLocation?: () => void;
  date: string;
}

export default function PinCard({
  PinCard,
  handleMyLocation,
  date,
}: PinCardProps) {
  const setIsBottomSheetOpen = useBottomSheetStore(
    (state) => state.setIsBottomSheetOpen
  );
  return (
    <article className="absolute bottom-[54px] w-full bg-transparent flex flex-col gap-5">
      <div className="w-full flex justify-center cursor-pointer">
        <div
          className="w-[92px] h-[34px] flex gap-[2px] justify-center items-center bg-white rounded-[30px] shadow-locationButton"
          onClick={() => {
            setIsBottomSheetOpen(true);
          }}
        >
          <HamburgerSVG />
          <p className="title3 text-grey7">목록보기</p>
        </div>
        <MyLocationSVG
          className="absolute right-[20px] top-[-3px] shadow-locationButton cursor-pointer rounded-full"
          onClick={handleMyLocation}
        />
      </div>
      <ResultCard {...PinCard} date={date} />
    </article>
  );
}
