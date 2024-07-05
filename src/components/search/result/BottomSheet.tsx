'use client';
import { useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { ResultCardProps } from 'types/search/result/searchResult';
import ResultCard from './ResultCard';

interface BottomSheetProps {
  results: ResultCardProps[];
}

export default function BottomSheet({ results }: BottomSheetProps) {
  const [isOpen, setOpen] = useState(false);
  const { innerHeight: height } = window;
  return (
    <Sheet
      className="mx-auto w-full min-w-[360px] max-w-[480px]"
      isOpen={true}
      // close 할일은 없지만 필수로 넣어야 함
      onClose={() => setOpen(false)}
      initialSnap={1}
      // 0: full screen, 1: 컨텐츠 한 개만, 2: 바텀시트 헤더만
      snapPoints={[innerHeight - 112, 210, 50]}
    >
      <Sheet.Container>
        <Sheet.Header className="shadow-none" />
        <Sheet.Content className='overflow-y-scroll'>
          {results.map((result) => (
            <ResultCard key={result.clubName} {...result} />
          ))}
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
