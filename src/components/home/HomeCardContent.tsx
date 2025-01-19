import Footer from '@components/all/Footer/Footer';
import ResultCard from '@components/all/ResultCard';
import { useHomeCards } from '@hooks/home/useHomeCards';
import { cookies } from 'next/headers';

export default function HomeCardContent({isLogin}: {isLogin: boolean}) {
  const { renderingClubCards } = useHomeCards(isLogin);

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
