import useIntersectionObserver from '@hooks/useIntersectionObserver';
import WifiSVG from '@public/svg/wifi.svg';
import useTab from '@store/tabNumberStore';
import { forwardRef, useRef } from 'react';

interface ServicesCardProps {
  servicesIcon: string[];
  services: string[];
}

// eslint-disable-next-line react/display-name
export const ServicesCard = forwardRef<HTMLDivElement, ServicesCardProps>(
  ({ servicesIcon, services }, ref) => {
    // const survicesRef = useRef<HTMLDivElement>(null);
    const setSelectedTab = useTab((state) => state.setSelectedTab);
    // useIntersectionObserver(survicesRef, () => setSelectedTab('편의시설'),1);
    return (
      <section className="flex flex-col gap-6 w-full px-5 py-[40px] border-b border-grey2" 
      // ref={survicesRef}
      >
        <p className="headline2 text-grey7">편의 시설 및 서비스</p>
        <div className="w-full flex flex-wrap gap-3" ref={ref}>
          {servicesIcon.map((icon, index) => (
            <div
              key={icon + index}
              className="flex items-center w-[calc(50%-0.375rem)] gap-2"
            >
              {icon === 'wifi' && <WifiSVG />}
              <p className="title4 text-grey7">{services[index]}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
);
