import UICardList from './UICardList';

export default function SportsUIList() {
  return (
    <div className="w-full h-[198px] flex flex-col gap-4 px-[30px] pb-[20px] border-b border-grey2 mb-[20px]">
      <div className="w-full justify-between flex ">
        <UICardList type="BILLIARDS" />
        <UICardList type="BALLING" />
        <UICardList type="GOLF" />
        <UICardList type="TABLE_TENNIS" />
      </div>
      <div className="w-full justify-between flex">
        <UICardList type="TENNIS" />
        <UICardList type="FOOTBALL" />
        <UICardList type="BASEBALL" />
        <UICardList type="SQUASH" />
      </div>
    </div>
  );
}
