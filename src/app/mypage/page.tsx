'use client';
import NavBar from '@components/all/NavBar/NavBar';
import My from '@components/mypage/My';
import NoneArrowHeader from '@components/all/NoneArrowHeader';
import Modal from '@components/all/Modal';

export default function page() {
  return (
    <div className="flex flex-col h-full pb-[54px] items-center">
      <NoneArrowHeader title="마이페이지" />
      <My />
      <Modal
        size="lg"
        button1Content="이전으로"
        button2Content="로그아웃"
        title="로그아웃 하시겠습니까?"
        // 추후에 로그아웃 함수 부착
      />
      <NavBar />
    </div>
  );
}
