import Header from '@components/all/Header';
import NavBar from "@components/all/NavBar/NavBar";


export default function page() {
  return (
    <div>
      <Header buttonType="back" title="작성한 리뷰" />
      This is {'예약내역-작성한 리뷰 보기'} page
      <NavBar />
    </div>
  );
}
