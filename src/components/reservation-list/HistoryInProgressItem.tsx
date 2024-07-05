import NullImageSVG from '@public/svg/nullImage.svg';
import SmallCalendarSVG from '@public/svg/smallCalendar.svg';
import SmallClockSVG from '@public/svg/smallClock.svg';
import SmallPersonSVG from '@public/svg/smallPerson.svg';
import FullButton from '@components/all/FullButton';
import { HistoryInProgressItemProps } from 'types/reservation-list/ReservationListPageTypes';

export default function HistoryInProgressItem({
  imageUrl,
  companyName,
  companyAddress,
  eventDate,
  eventStartTime,
  eventEndTime,
  adultCount,
  youngManCount,
  kidCount,
  reservationStatus,
}: HistoryInProgressItemProps) {
  return (
    <div className="w-eightNineWidth h-fit p-5 gap-y-6 flex flex-col justify-between items-center shadow-myPageLogoutButton rounded-[10px]">
      <section
        id="this-is-upper-section"
        className="w-sevenEightWidth h-fit flex justify-between gap-x-4"
      >
        <NullImageSVG />
        <div className="w-fit h-fit flex flex-col justify-between items-start gap-y-3">
          <div className="w-full h-fit flex flex-col justify-between items-start gap-y-1">
            <span className="title3 text-grey3">{companyName}</span>
            <span className="body4 text-grey5">{companyAddress}</span>
          </div>
          <div className="w-full h-fit flex flex-col justify-between items-start gap-y-1">
            <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
              <SmallCalendarSVG />
              <span className="body4 text-grey7">{eventDate}</span>
            </div>
            <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
              <SmallClockSVG />
              <span className="body4 text-grey7">
                {eventStartTime} ~ {eventEndTime}
              </span>
            </div>
            <div className="w-full h-fit flex justify-start items-center gap-x-[6px]">
              <SmallPersonSVG />
              <span className="body4 text-grey7">
                {!adultCount && `성인 ${adultCount}명`}
                {!youngManCount && `청소년 ${youngManCount}명`}
                {!kidCount && `어린이 ${kidCount}명`}
              </span>
            </div>
          </div>
        </div>
      </section>
      {reservationStatus === 'inProgress' && (
        <div className="w-sevenEightWidth h-fit flex gap-[10px]">
          <FullButton
            bgColor="white"
            color="status_red1"
            size="sm"
            content="예약 취소"
            className="shadow-cancelButton"
          />
          <FullButton
            bgColor="primary_orange2"
            color="primary_orange1"
            size="sm"
            content="예약 확인중"
          />
        </div>
      )}
      {reservationStatus === 'canceled' && (
        <div className="w-sevenEightWidth h-fit">
          <FullButton
            bgColor="status_red1_opacity"
            color="status_red1"
            size="sm"
            content="예약 취소됨"
          />
        </div>
      )}
      {reservationStatus === 'confirmed' && (
        <div className="w-sevenEightWidth h-fit">
          <FullButton
            bgColor="primary_orange1"
            color="white"
            size="sm"
            content="예약 확정됨"
          />
        </div>
      )}
      {reservationStatus === 'denied' && (
        <div className="w-sevenEightWidth h-fit">
          <FullButton
            bgColor="grey3"
            color="white"
            size="sm"
            content="예약 거절됨"
          />
        </div>
      )}
    </div>
  );
}
