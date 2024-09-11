import ToastTigSVG from '@public/svg/toastTig.svg';
import OkToastIconSVG from '@public/svg/okToastIcon.svg';
import WarningToastIconSVG from '@public/svg/warningToastIcon.svg';

export const toastUIDuration = 200;

interface toastUIProps {
  message: string;
  iswarning: boolean;
}

export default function ToastUI({ message, iswarning }: toastUIProps) {
  return (
    <div className="w-fit py-2 px-[14px] h-10 bg-grey6 rounded-lg flex justify-center items-center gap-x-[6px]">
      {iswarning ? <WarningToastIconSVG /> : <OkToastIconSVG />}
      <span className="title4 text-white">{message}</span>
    </div>
  );
}
