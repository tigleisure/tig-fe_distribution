import Header from '@components/all/Header';
import Review from '@components/reservation-list/review/Review';

interface reviewIdPathnameProp {
  params: {
    reviewId: string;
  };
}

export default async function Page({ params }: reviewIdPathnameProp) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/review/${params.reviewId}`,
    { cache: 'no-store' }
  );

  const reviewData = await response.json();

  return (
    <div className="flex flex-col h-full relative ">
      <Header buttonType="back" title="작성한 리뷰" />
      <main className="pt-[68px] w-full h-fit flex justify-center">
        <Review
          {...reviewData.result.reservation}
          rating={reviewData.result.review.rating}
          rateContent={reviewData.result.review.contents}
        />
      </main>
    </div>
  );
}
