'use client';
import Modal from '@components/all/Modal';
import FullButton from '@components/all/FullButton';
import NavBar from '@components/all/NavBar/NavBar';
import Tabs from '@components/all/Tabs/Tabs';
import { homeleisureArray } from '@constant/constant';
import useModal from '@store/modalStore';
import SearchHeader from '@components/all/SearchHeader';
import DummyBannerSVG from '@public/svg/dummyBanner.svg';
import { HomeCardProps } from 'types/home/HomeTypes';
import HomeCardList from '@components/home/HomeCardList';

const DUMMYCLUBCARDS: HomeCardProps[] = [
  {
    clubName: '스크린 골프',
    gameType: '골프',
    id: '1',
    image: '/png/dummyImage.png',
    subtitle: '골프장입니다',
  },
  {
    clubName: '스크린 축구',
    gameType: '축구',
    id: '2',
    image: '/png/dummyImage.png',
    subtitle: '축구장입니다',
  },
  {
    clubName: '스크린 농구',
    gameType: '농구',
    id: '3',
    image: '/png/dummyImage.png',
    subtitle: '농구장입니다',
  },
  {
    clubName: '스크린 테니스',
    gameType: '테니스',
    id: '4',
    image: '/png/dummyImage.png',
    subtitle: '테니스장입니다',
  },
  {
    clubName: '스크린 야구',
    gameType: '야구',
    id: '5',
    image: '/png/dummyImage.png',
    subtitle: '야구장입니다',
  },
];
const DUMMYEVENTCLUBCARDS: HomeCardProps[] = [
  {
    clubName: '스크린 골프',
    gameType: '골프',
    id: '1',
    image: '/png/dummyImage.png',
    subtitle: '골프장입니다',
    isEventCard: true,
  },
  {
    clubName: '스크린 축구',
    gameType: '축구',
    id: '2',
    image: '/png/dummyImage.png',
    subtitle: '축구장입니다',
    isEventCard: true,
  },
  {
    clubName: '스크린 농구',
    gameType: '농구',
    id: '3',
    image: '/png/dummyImage.png',
    subtitle: '농구장입니다',
    isEventCard: true,
  },
  {
    clubName: '스크린 테니스',
    gameType: '테니스',
    id: '4',
    image: '/png/dummyImage.png',
    subtitle: '테니스장입니다',
    isEventCard: true,
  },
  {
    clubName: '스크린 야구',
    gameType: '야구',
    id: '5',
    image: '/png/dummyImage.png',
    subtitle: '야구장입니다',
    isEventCard: true,
  },
];

export default function Home() {
  const homeArray = homeleisureArray;
  // const setModal = useModal((state) => state.setSelectedIsModalOpen);
  return (
    <main className="h-full w-full flex flex-col overflow-y-scroll after:content-[''] after:absolute after:top-0 after:right-0 after:w-[20px] after:h-full after:bg-gradient-to-l after:from-[rgba(255,255,255,0.5)] after:to-transparent">
      <SearchHeader />
      <Tabs tabArray={homeArray} from="home" className='top-[44px]'/>
      <div className="w-full max-w-[640px] mt-[95px] p-5">
        <DummyBannerSVG className="w-full h-auto" />
      </div>
      <HomeCardList
        title="근처에서 즐길 수 있는 스포츠예요"
        Card={DUMMYCLUBCARDS}
      />
      <HomeCardList
        title="지금 이벤트 중인 스포츠예요"
        Card={DUMMYEVENTCLUBCARDS}
      />
      <HomeCardList title="이런 스포츠 어때요?" Card={DUMMYCLUBCARDS} />
      {/* <FullButton
        size="md"
        bgColor="primary_orange1"
        color="white"
        content="예약하기"
        onClick={() => setModal(true)}
      />
      <Modal
        size="lg"
        button1Content="확인"
        button2Content="이전"
        title="예약을 취소하시겠습니까?"
        subTitle="예약 취소 시 수수료가 발생할 수 있습니다."
      /> */}
      <NavBar />
    </main>
  );
}
