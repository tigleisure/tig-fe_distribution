'use client';
import NavBar from '@components/all/NavBar/NavBar';
import My from '@components/mypage/My';
import NoneArrowHeader from '@components/all/NoneArrowHeader';
import Modal from '@components/all/Modal';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import useModal from '@store/modalStore';
import { useRouter } from 'next/navigation';

export default function Page() {
  const setSelectedIsModalOpen = useModal(
    (state) => state.setSelectedIsModalOpen
  );
  const router = useRouter();

  // useEffect(() => {
  //   if (localStorage.getItem('accessToken') === null) {
  //     router.replace('/login');
  //   }
  // }, []);

  useEffect(() => {
    return () => setSelectedIsModalOpen(false);
  }, []);

  const handleClickLogoutButton = (): void => {
    console.log('logout!');
    localStorage.removeItem('accessToken');
    // 추후에 refreshToken도 무효화시켜달라는 백엔드 API가 필요
    router.replace('/');
  };

  return (
    <div className="flex flex-col h-full pb-[54px] items-center">
      <NoneArrowHeader title="마이페이지" />
      <My />
      <Modal
        size="lg"
        button1Content="이전으로"
        button2Content="로그아웃"
        title="로그아웃 하시겠습니까?"
        secondButtonFunc={handleClickLogoutButton}
      />

      {/* <NavBar /> */}
      <Toaster position="bottom-center" containerStyle={{ bottom: '75px' }} />
    </div>
  );
}
