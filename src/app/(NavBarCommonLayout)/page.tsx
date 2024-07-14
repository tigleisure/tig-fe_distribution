'use client';
import Modal from '@components/all/Modal';
import FullButton from '@components/all/FullButton';
import NavBar from '@components/all/NavBar/NavBar';
import Tabs from '@components/all/Tabs/Tabs';
import { homeleisureArray } from '@constant/constant';
import useModal from '@store/modalStore';
import SearchHeader from '@components/all/SearchHeader';
import DummyBannerSVG from '@public/svg/dummyBanner.svg';
import HomeBannerSVG from '@public/svg/homeBanner.svg';
import Image from 'next/image';
import { HomeCardProps } from 'types/home/HomeTypes';
import HomeCardList from '@components/home/HomeCardList';
import useTab from '@store/tabNumberStore';
import { useEffect, useState } from 'react';

const DUMMYCLUBCARDS: HomeCardProps[] = [
  {
    clubName: '스크린 골프',
    gameType: '스크린골프',
    id: '1',
    image: '/png/dummyImage.png',
    subtitle: '골프장입니다',
  },
  {
    clubName: '스크린 당구',
    gameType: '당구',
    id: '2',
    image: '/png/dummyImage.png',
    subtitle: '당구장입니다',
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
    clubName: '스크린 탁구',
    gameType: '탁구',
    id: '5',
    image: '/png/dummyImage.png',
    subtitle: '탁구장입니다',
  },
];
const DUMMYEVENTCLUBCARDS: HomeCardProps[] = [
  {
    clubName: '스크린 골프',
    gameType: '스크린골프',
    id: '1',
    image: '/png/dummyImage.png',
    subtitle: '골프장입니다',
    isEventCard: true,
  },
  {
    clubName: '스크린 당구',
    gameType: '당구',
    id: '2',
    image: '/png/dummyImage.png',
    subtitle: '당구장입니다',
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
    clubName: '스크린 탁구',
    gameType: '탁구',
    id: '5',
    image: '/png/dummyImage.png',
    subtitle: '탁구장입니다',
    isEventCard: true,
  },
];

export default function Home() {
  const homeArray = homeleisureArray;
  const selectedTab = useTab((state) => state.selectedTab);
  const [clubCards, setClubCards] = useState<HomeCardProps[]>(DUMMYCLUBCARDS);
  const [eventClubCards, setEventClubCards] =
    useState<HomeCardProps[]>(DUMMYEVENTCLUBCARDS);

  useEffect(() => {
    if (selectedTab == '홈') {
      setClubCards(DUMMYCLUBCARDS);
      setEventClubCards(DUMMYEVENTCLUBCARDS);
      return;
    } else {
      const filteredClubCards = DUMMYCLUBCARDS.filter(
        (card) => card.gameType === selectedTab
      );
      console.log('filteredClubCards', filteredClubCards);
      setClubCards(filteredClubCards);
      const filteredEventClubCards = DUMMYEVENTCLUBCARDS.filter(
        (card) => card.gameType === selectedTab
      );
      setEventClubCards(filteredEventClubCards);
    }
  }, [selectedTab]);

  useEffect(() => {
    // POST 요청
    // body에 들어갈 정보
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  return (
    <main className="h-full w-full flex flex-col overflow-y-scroll">
      <SearchHeader isHomeOrResultPage />
      <Tabs tabArray={homeArray} from="home" className="top-[58px]" />
      <div className="w-full max-w-[640px] mt-[111px] p-5 mb-5">
        {/* <DummyBannerSVG className="w-full h-auto" /> */}
        <HomeBannerSVG className="w-full h-auto" />
        {/* <TigBannerSVG className="w-full h-auto" /> */}
      </div>
      {clubCards.length !== 0 && (
        <HomeCardList
          title="근처에서 즐길 수 있는 스포츠예요"
          Card={clubCards}
        />
      )}
      {eventClubCards.length !== 0 && (
        <HomeCardList
          title="지금 이벤트 중인 스포츠예요"
          Card={eventClubCards}
        />
      )}
      <HomeCardList title="이런 스포츠 어때요?" Card={DUMMYCLUBCARDS} />
      {/* <NavBar /> */}
    </main>
  );
}
