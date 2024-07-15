'use client';
import Modal from '@components/all/Modal';
import FullButton from '@components/all/FullButton';
import NavBar from '@components/all/NavBar/NavBar';
import Tabs from '@components/all/Tabs/Tabs';
import { categoryMapEngToKor, homeleisureArray } from '@constant/constant';
import useModal from '@store/modalStore';
import SearchHeader from '@components/all/SearchHeader';
import DummyBannerSVG from '@public/svg/dummyBanner.svg';
import HomeBannerSVG from '@public/svg/homeBanner.svg';
import Image from 'next/image';
import { HomeCardProps } from 'types/home/HomeTypes';
import HomeCardList from '@components/home/HomeCardList';
import useTab from '@store/tabNumberStore';
import { useEffect, useState } from 'react';
import { usePostHome } from '@apis/wishlist/postHome';
import { Club } from 'types/response/response';

export default function Home() {
  const homeArray = homeleisureArray;
  const selectedTab = useTab((state) => state.selectedTab);
  const { mutate, isPending, isSuccess } = usePostHome();
  const [clubCards, setClubCards] = useState<Club[]>([]);
  const [recommendClubCards, setRecommendClubCards] = useState<Club[]>([]);
  const [originalClubCards, setOriginalClubCards] = useState<Club[]>([]);
  // 이런스포츠 어때요는 상시 표기, 진행중인 이벤트에 대해 original 필요함
  // const [originalEventClubCards, setOriginalEventClubCards] = useState<
  //   Club[]
  // >([]);

  useEffect(() => {
    if (selectedTab === '홈') {
      setClubCards(originalClubCards);
    } else {
      const filteredClubCards = originalClubCards.filter(
        (card) => categoryMapEngToKor[card.category] === selectedTab
      );
      setClubCards(filteredClubCards);
    }
  }, [selectedTab, originalClubCards]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      mutate(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        {
          onSuccess: (data) => {
            console.log(data);
            setOriginalClubCards(data.result[0].nearestClubs);
            // setOriginalEventClubCards(data.result[0].popularClubs);
            setClubCards(data.result[0].nearestClubs);
            setRecommendClubCards(data.result[0].recommendedClubs);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    });
  }, [mutate]);

  return (
    <main className="h-full w-full flex flex-col overflow-y-scroll">
      <SearchHeader isHomeOrResultPage />
      <Tabs tabArray={homeArray} from="home" className="top-[58px]" />
      <div className="w-full max-w-[640px] mt-[111px] p-5 mb-5">
        {/* <DummyBannerSVG className="w-full h-auto" /> */}
        <HomeBannerSVG className="w-full h-auto" />
        {/* <TigBannerSVG className="w-full h-auto" /> */}
      </div>
      {!isSuccess ? (
        <div className="flex w-full justify-center pt-5 title2 text-grey7">
          로딩중
        </div>
      ) : (
        clubCards.length !== 0 && (
          <HomeCardList
            title="근처에서 즐길 수 있는 스포츠예요"
            Card={clubCards}
          />
        )
      )}
      {/* {eventClubCards.length !== 0 && (
        <HomeCardList
          title="지금 이벤트 중인 스포츠예요"
          Card={eventClubCards}
        />
      )} */}
      {isSuccess && (
        <HomeCardList title="이런 스포츠 어때요?" Card={recommendClubCards} />
      )}

      {/* <NavBar /> */}
    </main>
  );
}
