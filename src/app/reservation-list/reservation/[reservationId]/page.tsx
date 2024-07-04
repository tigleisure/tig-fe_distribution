import Header from '@components/all/Header';
import NavBar from "@components/all/NavBar/NavBar";


export default function page() {
  return (
    <div>
      <Header buttonType="back" title="예약 상세" />
      This is {'예약내역-예약 상세 보기'} page
      <NavBar />
    </div>
  );
}
