import NavBar from '@components/all/NavBar/NavBar';
import HistoryHead from '@components/reservation-list/HistoryHead';

export default function page() {
  return (
    <div>
      This is reservation-list page
      <HistoryHead totalCount={5} inProgressCount={3} completedCount={2} />
      <NavBar />
    </div>
  );
}
