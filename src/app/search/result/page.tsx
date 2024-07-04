import NavBar from '@components/all/NavBar';
import Tabs from '@components/all/Tabs/Tabs';
import { allleisureArray } from '@constant/constant';

export default function page() {
  const tabArray = allleisureArray;
  return (
    <div>
      <Tabs tabArray={tabArray} rounded from="search" />
      This is search result page
      <NavBar />
    </div>
  );
}
