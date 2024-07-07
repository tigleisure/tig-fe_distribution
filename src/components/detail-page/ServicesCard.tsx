import WifiSVG from '@public/svg/wifi.svg';

interface ServicesCardProps {
  servicesIcon: string[];
  services: string[];
}

export default function ServicesCard({
  servicesIcon,
  services,
}: ServicesCardProps) {
  return (
    <section className="flex flex-col gap-6 w-full px-5 py-[40px] border-b border-grey2">
      <p className="headline2 text-grey7">편의 시설 및 서비스</p>
      <div className="w-full flex flex-wrap gap-3">
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
