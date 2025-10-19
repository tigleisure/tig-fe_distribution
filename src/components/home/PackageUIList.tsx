import UICardList from './UICardList';

export default function PackageUIList() {
  return (
    <div className="w-full h-[198px] flex flex-col gap-4 px-[30px] pb-[20px] border-b border-grey2 mb-[20px]">
      <div className="w-full justify-around flex ">
        <UICardList type="GOLF_COURSE" />
        <UICardList type="PENSION" />
        <UICardList type="BUS" />
      </div>
      <div className="w-full justify-around flex">
        <UICardList type="CATERING" />
        <UICardList type="LUNCH_BOX" />
        <UICardList type="GROUP_UNIFORM" />
      </div>
    </div>
  );
}
