'use client';
import NavBar from '@components/all/NavBar/NavBar';
import Tabs from '@components/all/Tabs/Tabs';
import { allleisureArray, categoryMapKorToEng } from '@constant/constant';
import NoneArrowHeader from '@components/all/NoneArrowHeader';
import { ResultCardProps } from 'types/search/result/searchResult';
import ResultCard from '@components/search/result/ResultCard';
import { useEffect, useState } from 'react';
import useTab from '@store/tabNumberStore';
import { useGetWishList } from '@apis/wishlist/getWishList';
import NoneResultUI from '@components/all/NoneResultUI/NoneResultUI';
import Lottie from 'lottie-react';
import TigLoadingAnimation from '@public/lottie/TigLoadingAnimation.json';

export default function Page() {
  const selectedTab = useTab((state) => state.selectedTab);
  const { data, isError, error, isSuccess } = useGetWishList();

  const tabArray = allleisureArray;

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col h-full pb-[54px] items-center">
      <NoneArrowHeader title="위시리스트" />
      <Tabs
        tabArray={tabArray}
        rounded
        from="wishlist"
        className="w-fit px-5 top-[68px] border-b-[1px] border-grey2"
      />

      {selectedTab === '전체' &&
        (isSuccess ? (
          data?.result.length > 0 ? (
            <main className="w-full max-h-wishListMain absolute top-[120px] pb-10 overflow-y-scroll">
              {data.result.map((wishListData) => (
                <ResultCard key={wishListData.id} {...wishListData} isHeart />
              ))}
            </main>
          ) : (
            <div className="flex w-full h-full justify-center items-center pt-[120px]  title2 text-grey7">
              <NoneResultUI
                message="위시리스트에 담긴 곳이 없어요"
                subMessage="마음에 드는 장소를 찾아 담아보세요!"
              />
            </div>
          )
        ) : (
          <div className="flex w-full h-full justify-center items-center pt-[120px]  title2 text-grey7">
            <Lottie
              animationData={TigLoadingAnimation}
              style={{ width: '30%' }}
            />
          </div>
        ))}

      {selectedTab !== '전체' &&
        (isSuccess ? (
          data?.result.length > 0 ? (
            <main className="w-full max-h-wishListMain absolute top-[120px] pb-10 overflow-y-scroll">
              {data.result
                .filter((wishListItem) => {
                  const mappedCategory = categoryMapKorToEng[selectedTab];
                  return wishListItem.category === mappedCategory;
                })
                .map((wishListData) => (
                  <ResultCard key={wishListData.id} {...wishListData} isHeart />
                ))}
            </main>
          ) : (
            <div className="flex w-full h-full justify-center items-center pt-[120px]  title2 text-grey7">
              <NoneResultUI
                message="위시리스트에 담긴 곳이 없어요"
                subMessage="마음에 드는 장소를 찾아 담아보세요!"
              />
            </div>
          )
        ) : (
          <div className="flex w-full h-full justify-center items-center pt-[120px]  title2 text-grey7">
            <Lottie
              animationData={TigLoadingAnimation}
              style={{ width: '30%' }}
            />
          </div>
        ))}

      {/* <NavBar /> */}
    </div>
  );
}
