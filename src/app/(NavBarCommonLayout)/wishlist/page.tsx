'use client';
import { categoryMapKorToEng } from '@constant/constant';
import ResultCard from '@components/search/result/ResultCard';
import { Fragment, useEffect, useState } from 'react';
import useTab from '@store/tabNumberStore';
import { useGetWishList } from '@apis/wishlist/getWishList';
import NoneResultUI from '@components/all/NoneResultUI/NoneResultUI';

export default function Page() {
  const selectedTab = useTab((state) => state.selectedTab);
  const { data: wishList } = useGetWishList();
  const [filteredWishList, setFilteredWishList] = useState(wishList.result);
  
  useEffect(() => {
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
  }, [selectedTab, wishList.result]);

  return (
    <Fragment>
      {filteredWishList.length > 0 ? (
        <main className="w-full max-h-wishListMain absolute top-[120px] pb-10 overflow-y-scroll">
          {filteredWishList.map((wishListData) => (
            <ResultCard
              key={wishListData.id}
              {...wishListData}
              clubId={wishListData.id}
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
    </Fragment>
  );
}
