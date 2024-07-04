import Header from "@components/all/Header";
import SearchInput from "@components/all/SearchInput";

export default function page() {
  return <div>
    <Header buttonType="close" isCenter={true} title="검색하기"/>
    <SearchInput placeholder="검색어를 입력해주세요." />
  </div>;
}
