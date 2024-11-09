'use client';
import { useState, useEffect, useRef } from 'react';
import { Sheet, SheetRef } from 'react-modal-sheet';
import { ResultCardProps } from 'types/search/result/searchResult';
import ResultCard from '../../all/ResultCard';
import MylocationSVG from '@public/svg/myLocation.svg';

interface BottomSheetProps {
  results: ResultCardProps[];
  handleMyLocation?: () => void;
  date: string;
  handleClickCurrentLocationUIButton: () => void;
}

export default function BottomSheet({
  results,
  handleMyLocation,
  date,
  handleClickCurrentLocationUIButton,
}: BottomSheetProps) {
  const [isOpen, setOpen] = useState(false);
  const [height, setHeight] = useState<number>(500);
  // const ref = useRef<SheetRef>();
  // const snapTo = (i: number) => ref.current?.snapTo(i);

  useEffect(() => {
    function updateSnapPoints() {
      const calculateHeight = window.innerHeight - 199;
      setHeight(calculateHeight);
    }
    updateSnapPoints();
    window.addEventListener('resize', updateSnapPoints);
    return () => {
      window.removeEventListener('resize', updateSnapPoints);
    };
  }, []);

  return (
    <Sheet
      className="mx-auto w-full min-w-[360px] max-w-[480px] !z-[150]"
      // ref={ref}
      isOpen={true}
      // close 할일은 없지만 필수로 넣어야 함
      onClose={() => setOpen(false)}
      initialSnap={1}
      // 0: full screen, 1: 컨텐츠 한 개만, 2: 바텀시트 헤더만
      snapPoints={[height, 234, 74]}
    >
      <Sheet.Container className="relative h-full w-full !shadow-none">
        <Sheet.Header className="w-full h-[40px] flex justify-center pt-[6px] cursor-pointer relative">
          <div className="w-[40px] h-[4px] rounded-[2px] bg-grey3" />
          <MylocationSVG
            className="absolute right-[20px] top-[-60px] shadow-locationButton rounded-full"
            onClick={() => {
              handleClickCurrentLocationUIButton();
              if (handleMyLocation) {
                handleMyLocation();
              }
            }}
          />
          {/* <button className='absolute left-[20px] top-[-60px] shadow-locationButton rounded-full bg-white' onClick={()=>{
            snapTo(0)
          }}>목록보기</button> */}
        </Sheet.Header>
        <Sheet.Content
          className="overflow-y-scroll z-10 h-full w-full relative !grow-0"
          disableDrag={true}
        >
          {results.length === 0 && (
            <div className="w-full h-[140px] flex flex-col gap-[10px] justify-center items-center">
              <p className="title2 text-grey7">검색 결과가 없어요.</p>
              <p className="caption1 text-grey5">검색 필터를 수정해보세요!</p>
            </div>
          )}
          {results.map((result, idx) => {
            if (idx === 0)
              return <ResultCard key={result.clubId} {...result} isFirst />;
            if (idx === results.length - 1)
              return <ResultCard key={result.clubId} {...result} isLast />;
            return <ResultCard key={result.clubId} {...result} />;
          })}
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
