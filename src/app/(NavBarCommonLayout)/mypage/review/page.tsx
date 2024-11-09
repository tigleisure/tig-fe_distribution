'use client';
import { useGetReservationList } from '@apis/reservation-list/getUserReservationList';
import MypageFooter from '@components/all/Footer/MypageFooter';
import Header from '@components/all/Header';
import HistoryEndItem from '@components/reservation-list/HistoryEndItem';
import NonLoginIconSVG from '@public/svg/nonLogin/nonLoginIcon.svg';

export default function Page() {
  const { data } = useGetReservationList();
  const doneReservationList = data.result.filter(
    (reservation) => reservation.status === 'DONE'
  );
  const reviewedReservationList = doneReservationList.filter(
    (reservation) => reservation.status === 'REVIEWED'
  );
  const isEmpty =
    reviewedReservationList?.length === 0 && doneReservationList.length === 0;
  return (
    <div className="bg-grey1 w-full h-[calc(100%-160px)] flex flex-col items-center">
      <Header buttonType="back" title="리뷰" bgColor="grey" isCenter />
      <p className="body2 text-grey7 px-5 py-[10px] mt-[68px] w-full mb-[40px]">
        작성한 리뷰 <span className="text-primary_orange1 body2">0</span>개
      </p>
      {isEmpty && (
        <>
          <NonLoginIconSVG />
          <p className="title2 text-grey4 pt-5">아직 작성한 리뷰가 없어요</p>
        </>
      )}
      {!isEmpty && (
        <div className="flex flex-col w-full px-5 mt-[68px] h-full">
          <p className="body2 text-grey7 px-5 py-[10px] w-full mb-[40px]">
            작성가능한 리뷰{' '}
            <span className="text-primary_orange1 body2">
              {doneReservationList.length}
            </span>
            개
          </p>
          <div className="flex flex-col gap-[10px] w-full h-full">
            {doneReservationList.map((reservation) => (
              <HistoryEndItem key={reservation.clubId} {...reservation} />
            ))}
          </div>
          <p className="body2 text-grey7 px-5 py-[10px] w-full mb-[40px]">
            작성한 리뷰{' '}
            <span className="text-primary_orange1 body2">
              {reviewedReservationList.length}
            </span>
            개
          </p>
          <div className="flex flex-col gap-[10px] w-full h-full">
            {doneReservationList.map((reservation) => (
              <HistoryEndItem key={reservation.clubId} {...reservation} />
            ))}
          </div>
        </div>
      )}
      <MypageFooter />
    </div>
  );
}
