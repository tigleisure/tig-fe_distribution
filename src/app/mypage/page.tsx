import NavBar from '@components/all/NavBar/NavBar';
import My from '@components/mypage/My';
import NoneArrowHeader from '@components/all/NoneArrowHeader';

export default function page() {
  return (
    <div className="flex flex-col h-full pb-[54px] items-center">
      <NoneArrowHeader title="마이페이지" />
      <My />
      <NavBar />
    </div>
  );
}
