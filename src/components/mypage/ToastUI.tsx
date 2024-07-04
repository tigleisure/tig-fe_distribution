import ToastTigSVG from '@public/svg/toastTig.svg';

export default function ToastUI() {
  return (
    <div className="w-[165px] h-10 bg-grey5 rounded-lg flex justify-center items-center gap-x-[5px]">
      <ToastTigSVG />
      <span className="title4 text-secondary_green2">
        변경이 완료되었습니다.
      </span>
    </div>
  );
}
