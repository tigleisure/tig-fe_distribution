import NavBar from "@components/all/NavBar/NavBar";
import Login from '@components/login/Login';

export default function page() {
  return (
    <div>
      This is login page
      <Login />
      <NavBar />
    </div>
  );
}
