export default function WishListItemSkeleton() {
  return (
    <section className="w-full h-[168px] flex gap-4 p-5 border-b border-grey2 max-w-[480px] min-w-[360px] bg-white animate-pulse">
      <div className="relative shrink-0">
        <div className="relative w-[128px] h-[128px] rounded-[10px] overflow-hidden bg-grey2"></div>
      </div>
      <div className="w-full flex flex-col justify-between h-full">
        <div className="w-full h-fit flex flex-col gap-[10px]">
          <div className="w-full flex flex-col gap-1">
            <p className="title3 w-[100px] h-[20px] bg-grey2 rounded"></p>
            <p className="body4 w-[100px] h-[10px] bg-grey2 rounded"></p>
          </div>
          <div className="flex gap-[6px] h-[25px]">
            <p className="w-[44px] h-[25px] bg-grey2 rounded"></p>
            <p className="h-[10px] w-[100px] bg-grey2 rounded"></p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="h-[20px] w-[100px] bg-grey2 rounded"></p>
          <p className="h-[10px] w-[100px] bg-grey2 rounded"></p>
        </div>
      </div>
    </section>
  );
}
