import NavBar from "@components/all/NavBar/NavBar";
import Tabs from '@components/all/Tabs/Tabs';
import { allleisureArray } from '@constant/constant';

export default function page() {
  const tabArray = allleisureArray;
  return (
    <div>
      <Tabs tabArray={tabArray} rounded from="wishlist" />
      This is wish list page
      <NavBar />
    </div>
  );
}
