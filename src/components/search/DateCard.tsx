import Calender from './Calender';
import InfoCard from './InfoCard';

export default function DateCard() {
  return (
    <section className="w-full flex flex-col gap-5 p-5 mt-5 border-b border-grey2">
      <InfoCard number={2} content="날짜를 선택해주세요." />
      <Calender />
    </section>
  );
}
