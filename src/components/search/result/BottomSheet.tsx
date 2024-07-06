'use client';
import { useState, useEffect } from 'react';
import { Sheet } from 'react-modal-sheet';
import { ResultCardProps } from 'types/search/result/searchResult';
import ResultCard from './ResultCard';
import NavBar from '@components/all/NavBar/NavBar';

interface BottomSheetProps {
  results: ResultCardProps[];
}

export default function BottomSheet({ results }: BottomSheetProps) {
  const [isOpen, setOpen] = useState(false);
  const [height, setHeight] = useState<number>(500);

  useEffect(() => {
    function updateSnapPoints() {
      const calculateHeight = window.innerHeight- 112;
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
      snapPoints={[height, 264, 104]}
    >
      <Sheet.Container className='relative h-full w-full'>
        <Sheet.Header className="shadow-none" />
        <Sheet.Content className='overflow-y-scroll z-10 h-full w-full relative !grow-0' disableDrag={true}>
          {results.map((result) => (
            <ResultCard key={result.clubName} {...result} />
          ))}
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
