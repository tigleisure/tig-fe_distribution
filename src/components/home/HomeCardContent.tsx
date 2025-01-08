import Footer from '@components/all/Footer/Footer';
import ResultCard from '@components/all/ResultCard';
import { useHomeCards } from '@hooks/home/useHomeCards';

export default function HomeCardContent() {
  const { renderingClubCards } = useHomeCards();

  return (
    <>
      <div className="w-full">
        {renderingClubCards.map((club) => (
          <ResultCard key={club.clubId} {...club} />
        ))}
      </div>
      <Footer />
    </>
  );
}
