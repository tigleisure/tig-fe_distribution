import UICardList from './UICardList';

export default function UIList() {
  return (
    <div className="w-full h-[198px] flex flex-col gap-4 px-[30px] pb-[20px] border-b border-grey2 mb-[20px]">
      <div className="w-full justify-between flex ">
        <UICardList type="BALLING" />
        <UICardList type="TABLE_TENNIS" />
        <UICardList type="POCKET_BALL" />
        <UICardList type="SCREEN_GOLF" />
      </div>
      <div className="w-full justify-between flex">
        <UICardList type="TENNIS" />
        <UICardList type="FOOTBALL" />
        <UICardList type="SQUASH" />
        <UICardList type="BASEBALL" />
      </div>
    </div>
  );
}
