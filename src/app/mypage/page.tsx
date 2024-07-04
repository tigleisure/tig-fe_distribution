import NavBar from '@components/all/NavBar';
import My from '@components/mypage/My';

export default function page() {
  return (
    <div>
      This is my profile page
      <My />
      <NavBar />
    </div>
  );
}
