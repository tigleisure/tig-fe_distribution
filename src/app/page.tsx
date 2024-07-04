import FullButton from '@components/all/FullButton';
import NavBar from '@components/all/NavBar/NavBar';
import Tabs from '@components/all/Tabs/Tabs';
import { homeleisureArray } from '@constant/constant';

export default function Home() {
  const homeArray = homeleisureArray;
  return (
    <div>
      <Tabs tabArray={homeArray} from="home" />
      <FullButton
        size="md"
        bgColor="primary_orange1"
        color="white"
        content="예약하기"
      />
      <NavBar />
    </div>
  );
}
