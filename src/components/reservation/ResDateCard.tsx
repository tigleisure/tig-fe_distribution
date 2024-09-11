import InfoCard from "@components/all/InfoCard";
import Calender from "@components/search/Calender";

export default function ResDateCard() {
  return (
    <section className="w-full flex flex-col gap-5 p-5 mt-5 border-b border-grey2 pt-[68px]">
      <InfoCard number={1} content="날짜를 선택해주세요." />
      <Calender />
    </section>
  );
}
