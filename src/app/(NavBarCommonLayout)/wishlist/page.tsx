'use client';
import NavBar from '@components/all/NavBar/NavBar';
import Tabs from '@components/all/Tabs/Tabs';
import { allleisureArray } from '@constant/constant';
import NoneArrowHeader from '@components/all/NoneArrowHeader';
import { ResultCardProps } from 'types/search/result/searchResult';
import ResultCard from '@components/search/result/ResultCard';
import { useEffect, useState } from 'react';
import useTab from '@store/tabNumberStore';
import { useGetWishList } from '@apis/wishlist/getWishList';

const categoryMap: { [key: string]: string } = {
  당구: 'POCKET_BALL',
  볼링: 'BALLING',
  스크린골프: 'SCREEN_GOLF',
  탁구: 'TABLE_TENNIS',
  테니스: 'TENNIS',
  전체: 'ALL',
};

export default function Page() {
  const selectedTab = useTab((state) => state.selectedTab);
  const { data, isError, error } = useGetWishList();

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

      {selectedTab === '전체' && (
        <main className="w-full max-h-wishListMain absolute top-[120px] pb-10 overflow-y-scroll">
          {data ? (
            data?.result?.length > 0 ? (
              data.result.map((data) => <ResultCard key={data.id} {...data} />)
            ) : (
              <div className="flex w-full justify-center pt-5 title2 text-grey7">
                위시리스트가 비어 있습니다.
              </div>
            )
          ) : (
            <div className="flex w-full justify-center pt-5 title2 text-grey7">
              로딩중
            </div>
          )}
        </main>
      )}

      {selectedTab !== '전체' && (
        <main className="w-full max-h-wishListMain absolute top-[120px] pb-10 overflow-y-scroll">
          {data ? (
            data?.result?.length > 0 ? (
              data.result
                .filter((wishListItem) => {
                  const mappedCategory = categoryMap[selectedTab];
                  return wishListItem.category === mappedCategory;
                })
                .map((data) => <ResultCard key={data.id} {...data} />)
            ) : (
              <div className="flex w-full justify-center pt-5 title2 text-grey7">
                위시리스트가 비어 있습니다.
              </div>
            )
          ) : (
            <div className="flex w-full justify-center pt-5 title2 text-grey7">
              로딩중
            </div>
          )}
        </main>
      )}

      {/* <NavBar /> */}
    </div>
  );
}
