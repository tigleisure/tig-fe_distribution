export default function HistoryInProgressItemSkeleton() {
  return (
    <div className="w-eightNineWidth h-fit p-5 gap-y-6 flex flex-col justify-between items-center shadow-myPageLogoutButton rounded-[10px] animate-pulse">
      <div className="w-full h-fit flex  gap-x-4 cursor-pointer">
        <div className="relative w-[106px] h-[106px] rounded-[10px] overflow-hidden bg-gray-200"></div>
        <div className="h-fit flex flex-col justify-between items-start gap-y-3 grow txt-overflow-ellipsis">
          <div className="w-full h-fit flex flex-col justify-between items-start gap-y-1">
            <span className="title3 text-grey7 txt-overflow-ellipsis bg-gray-200 w-[120px] h-[20px] rounded"></span>
            <span className="body4 text-grey5 txt-overflow-ellipsis bg-gray-200 w-[180px] h-[16px] rounded"></span>
          </div>
          <div className="w-full h-fit flex flex-col justify-between items-start gap-y-1">
            <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
              <span className="body4 text-grey7 bg-gray-200 h-[16px] w-[180px] rounded"></span>
            </div>
            <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
              <span className="body4 text-grey7 txt-overflow-ellipsis bg-gray-200 h-[16px] w-[100px] rounded"></span>
            </div>
            <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
              <span className="body4 text-grey7 bg-gray-200 h-[16px] w-[60px] rounded"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-fit flex gap-[10px]">
        <div className="h-[36px] w-full bg-gray-200 rounded"></div>
        <div className="h-[36px] w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
