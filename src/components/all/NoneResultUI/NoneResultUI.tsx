interface NoneUIProps {
  message: string;
  subMessage: string;
}

export default function NoneResultUI({ message, subMessage }: NoneUIProps) {
  return (
    <div className="w-[194px] h-[46px] flex flex-col justify-between items-center gap-y-[10px]">
      <span className="title2 text-grey7">{message}</span>
      <span className="caption1 text-grey5">{subMessage}</span>
    </div>
  );
}
