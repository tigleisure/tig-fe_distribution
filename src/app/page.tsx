import NavBar from '@components/all/NavBar';
import Tabs from '@components/all/Tabs/Tabs';
import { homeleisureArray } from '@constant/constant';

export default function Home() {
  const homeArray = homeleisureArray;
  return (
    <div>
      <Tabs tabArray={homeArray} from="home" />
      <NavBar />
    </div>
  );
}
