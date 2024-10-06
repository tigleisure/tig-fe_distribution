import InfoCard from '@components/all/InfoCard';
import Tabs from '@components/all/Tabs/Tabs';
import { subtabArrays } from '@constant/constant';
import useTab from '@store/tabNumberStore';
import { usePathname } from 'next/navigation';

export default function GameTypeCard() {
  const currentTab = useTab((state) => state.selectedTab);
  const subTabArray = subtabArrays[currentTab] || [];
  return (
    <section className="w-full flex flex-col p-5 mt-5 border-b border-grey2">
      <InfoCard number={4} content="원하는 게임 종류를 선택해주세요." />
      <Tabs
        tabArray={subTabArray}
        from="gameType"
        className="!relative mt-[20px]"
        rounded
      />
    </section>
  );
}
