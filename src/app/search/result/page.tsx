import { Suspense } from 'react';
import { SearchResult } from './SearchResult';

export default function Page() {
  return (
    <Suspense>
      <SearchResult />
    </Suspense>
  );
}
