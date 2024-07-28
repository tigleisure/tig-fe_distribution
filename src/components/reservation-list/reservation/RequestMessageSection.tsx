interface RequestMessagSectionProp {
  message: string;
}

export default function RequestMessageSection({
  message,
}: RequestMessagSectionProp) {
  return (
    <section className="w-full h-fit flex flex-col gap-y-5">
      <span className="title3 text-grey7">요청 사항</span>
      <span className="text-[12px] font-normal leading-[1.4] tracking-[-0.02em] text-grey7">
        {message}
      </span>
    </section>
  );
}
