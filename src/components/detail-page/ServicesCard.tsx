import { facilityMapEngToKor } from '@constant/constant';
import useTab from '@store/tabNumberStore';
import { forwardRef, useRef } from 'react';
import DELIVERY_AVAILABLESVG from '@public/svg/amenities/DELIVERY_AVAILABLE.svg';
import DISABLEDSVG from '@public/svg/amenities/DISABLED.svg';
import DRESSING_ROOMSVG from '@public/svg/amenities/DRESSING_ROOM.svg';
import GROUP_AVAILABILITYSVG from '@public/svg/amenities/GROUP_AVAILABILITY.svg';
import KIDS_FACILITYSVG from '@public/svg/amenities/KIDS_FACILITY.svg';
import PAID_PARKINGSVG from '@public/svg/amenities/PAID_PARKING.svg';
import PERSONAL_LOCKERSVG from '@public/svg/amenities/PERSONAL_LOCKER.svg';
import PET_ALLOWEDSVG from '@public/svg/amenities/PET_ALLOWED.svg';
import REST_FACILITYSVG from '@public/svg/amenities/REST_FACILITY.svg';
import TOILET_CLASSIFICATIONSVG from '@public/svg/amenities/TOILET_CLASSIFICATION.svg';
import VISIT_SERVICESVG from '@public/svg/amenities/VISIT_SERVICE.svg';
import WAITING_SPACESVG from '@public/svg/amenities/WAITING_SPACE.svg';
import WATER_PURIFIERSVG from '@public/svg/amenities/WATER_PURIFIER.svg';
import WIRELESS_INTERNETSVG from '@public/svg/amenities/WIRELESS_INTERNET.svg';


interface ServicesCardProps {
  services: string[];
}

// eslint-disable-next-line react/display-name
export const ServicesCard = forwardRef<HTMLDivElement, ServicesCardProps>(
  ({ services }, ref) => {
    // const survicesRef = useRef<HTMLDivElement>(null);
    const setSelectedTab = useTab((state) => state.setSelectedTab);
    // useIntersectionObserver(survicesRef, () => setSelectedTab('편의시설'),1);
    return (
      <section
        className="flex flex-col gap-6 w-full px-5 py-[40px] border-b border-grey2"
        // ref={survicesRef}
      >
        <p className="headline2 text-grey7">편의 시설 및 서비스</p>
        <div className="w-full flex flex-wrap gap-3" ref={ref}>
          {services.map((service, index) => (
            <div
              key={service + index}
              className="flex items-center w-[calc(50%-0.375rem)] gap-2"
            >
              {service === 'WIRELESS_INTERNET' && <WIRELESS_INTERNETSVG />}
              {service === 'DELIVERY_AVAILABLE' && <DELIVERY_AVAILABLESVG />}
              {service === 'DRESSING_ROOM' && <DRESSING_ROOMSVG />}
              {service === 'GROUP_AVAILABILITY' && <GROUP_AVAILABILITYSVG />}
              {service === 'KIDS_FACILITY' && <KIDS_FACILITYSVG />}
              {service === 'PARKING_AVAILABLE' && <PAID_PARKINGSVG />}
              {service === 'PAID_PARKING' && <PAID_PARKINGSVG />}
              {service === 'PERSONAL_LOCKER' && <PERSONAL_LOCKERSVG />}
              {service === 'PET_ALLOWED' && <PET_ALLOWEDSVG />}
              {service === 'REST_FACILITY' && <REST_FACILITYSVG />}
              {service === 'TOILET_CLASSIFICATION' && <TOILET_CLASSIFICATIONSVG />}
              {service === 'VISIT_SERVICE' && <VISIT_SERVICESVG />}
              {service === 'WAITING_SPACE' && <WAITING_SPACESVG />}
              {service === 'WATER_PURIFIER' && <WATER_PURIFIERSVG />}
              {service === 'WHEELCHAIR_ACCESSIBLE' && <DISABLEDSVG />}
              {service === 'ENTRANCE_WHEELCHAIR_ACCESSIBLE' && <DISABLEDSVG />}
              {service === 'SEAT_WHEELCHAIR_ACCESSIBLE' && <DISABLEDSVG />}
              {service === 'DISABLED_PARKING' && <DISABLEDSVG />}
              <p className="title4 text-grey7">
                {facilityMapEngToKor[service]}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
);
