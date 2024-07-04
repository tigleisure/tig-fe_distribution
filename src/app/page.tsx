'use client';
import Modal from '@components/all/Modal';
import FullButton from '@components/all/FullButton';
import NavBar from '@components/all/NavBar/NavBar';
import Tabs from '@components/all/Tabs/Tabs';
import { homeleisureArray } from '@constant/constant';
import useReservationModal from '@store/modalStore';

export default function Home() {
  const homeArray = homeleisureArray;
  const setReservationModal = useReservationModal(
    (state) => state.setSelectedIsReservationModalOpen
  );
  return (
    <div>
      <Tabs tabArray={homeArray} from="home" />
      <FullButton
        size="md"
        bgColor="primary_orange1"
        color="white"
        content="예약하기"
        onClick={() => setReservationModal(true)}
      />
      <Modal
        size="lg"
        button1Content="확인"
        button2Content="이전"
        title="예약을 취소하시겠습니까?"
        subTitle="예약 취소 시 수수료가 발생할 수 있습니다."
      />
      <NavBar />
    </div>
  );
}
