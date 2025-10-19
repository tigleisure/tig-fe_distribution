import Calender from './Calender';
import InfoCard from '../all/InfoCard';
import useTab from '@store/tabNumberStore';
import { cn } from '@components/lib/utils';

export default function DateCard() {
  const currentTab = useTab((state) => state.selectedTab);
  console.log(currentTab);
  return (
    <section
      className={cn(
        {
          'mt-5': currentTab === '스포츠',
          'mt-[70px]': currentTab === '패키지',
        },
        'w-full flex flex-col gap-5 p-5 border-b border-grey2'
      )}
    >
      <InfoCard
        number={currentTab === '스포츠' ? 2 : 1}
        content="날짜를 선택해주세요."
      />
      <Calender />
    </section>
  );
}
