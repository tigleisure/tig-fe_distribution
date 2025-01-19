'use client';
import { categoryMapKorToEng } from '@constant/constant';
import { useEffect, useState } from 'react';
import useTab from '@store/tabNumberStore';
import NoneResultUI from '@components/all/NoneResultUI/NoneResultUI';
import Tabs from '@components/all/Tabs/Tabs';
import { allleisureArray } from '@constant/constant';
import { ResultCardProps } from 'types/search/result/searchResult';
import NoLoginWishList from '@components/writing-review/NoLoginWishlist';
import ResultCard from '@components/all/ResultCard';
import { WishListResponse } from 'types/response/response';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getWishList } from '@apis/wishlist/getWishList';

export default function WishListPage() {
  const { data: wishList } = useSuspenseQuery<WishListResponse>({
    queryKey: ['wishlist'],
  });
  console.log(wishList);
  const selectedTab = useTab((state) => state.selectedTab);
  const [filteredWishList, setFilteredWishList] = useState<ResultCardProps[]>(
    wishList.result
  );
  const tabArray = allleisureArray;

  useEffect(() => {
    if (wishList.result) {
      if (selectedTab === '전체') {
        setFilteredWishList(wishList.result);
      } else {
        const mappedCategory = categoryMapKorToEng[selectedTab];
        setFilteredWishList(
          wishList.result.filter((wishListItem) => {
            return wishListItem.category === mappedCategory;
          })
        );
      }
    }
  }, [selectedTab, wishList.result]);

  return (
    <>
      <Tabs
        tabArray={tabArray}
        rounded
        from="wishlist"
        className="w-full px-5 top-[58px]"
      />
      {filteredWishList.length > 0 ? (
        <main className="w-full max-h-wishListMain absolute top-[120px] pb-10 overflow-y-scroll">
          {filteredWishList.map((wishListData) => (
            <ResultCard
              key={wishListData.clubId}
              {...wishListData}
              clubId={wishListData.clubId}
              isHeart
            />
          ))}
        </main>
      ) : (
        <div className="flex w-full h-full justify-center items-center pt-[120px]  title2 text-grey7">
          <NoneResultUI
            message="위시리스트에 담긴 곳이 없어요."
            subMessage="마음에 드는 장소를 찾아 담아보세요!"
          />
        </div>
      )}
    </>
  );
}
