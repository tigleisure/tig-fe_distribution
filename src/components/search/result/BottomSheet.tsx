'use client';
import { useState, useEffect } from 'react';
import { Sheet } from 'react-modal-sheet';
import { ResultCardProps } from 'types/search/result/searchResult';
import ResultCard from './ResultCard';
import MylocationSVG from '@public/svg/myLocation.svg';

interface BottomSheetProps {
  results: ResultCardProps[];
  handleMyLocation?: () => void;
}

export default function BottomSheet({
  results,
  handleMyLocation,
}: BottomSheetProps) {
  const [isOpen, setOpen] = useState(false);
  const [height, setHeight] = useState<number>(500);

  useEffect(() => {
    function updateSnapPoints() {
      const calculateHeight = window.innerHeight - 142;
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
      className="mx-auto w-full min-w-[360px] max-w-[480px] !z-10"
      isOpen={true}
      // close 할일은 없지만 필수로 넣어야 함
      onClose={() => setOpen(false)}
      initialSnap={1}
      // 0: full screen, 1: 컨텐츠 한 개만, 2: 바텀시트 헤더만
      snapPoints={[height, 234, 74]}
    >
      <Sheet.Container className="relative h-full w-full !shadow-none">
        <Sheet.Header className="w-full h-[20px] flex justify-center pt-[6px] cursor-pointer relative">
          <div className="w-[40px] h-[4px] rounded-[2px] bg-grey3" />
          <MylocationSVG
            className="absolute right-[20px] top-[-60px] shadow-locationButton"
            onClick={handleMyLocation}
          />
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
            if (idx === results.length - 1)
              return <ResultCard key={result.clubName} {...result} isLast />;
            return <ResultCard key={result.clubName} {...result} />;
          })}
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
