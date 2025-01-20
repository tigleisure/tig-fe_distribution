import { cookies } from 'next/headers';
import SearchResultPage from './SearchResultPage';

export default function Page() {
  const isLogin = cookies().get('accessToken') ? true : false;
  return <SearchResultPage isLogin={isLogin} />;
}
