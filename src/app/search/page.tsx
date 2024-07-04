import Header from '@components/all/Header';
import SearchInput from '@components/all/SearchInput';

export default function page() {
  return <div>
    <Header buttonType="close" isCenter={true} title="검색하기"/>
    <SearchInput placeholder="위치나 장소검색" />
  </div>;
}
