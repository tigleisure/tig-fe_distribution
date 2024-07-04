import Header from '@components/all/Header';
import Tabs from '@components/all/Tabs/Tabs';
import { detailArray } from '@constant/constant';

export default function page() {
  const tabArray = detailArray;
  return (
    <div>
      <Header buttonType="back" title="업체명" />
      <Tabs tabArray={tabArray} from="detail" />
    </div>
  );
}
