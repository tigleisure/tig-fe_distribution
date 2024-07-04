import UnderlinedTab from './UnderlinedTab';

const tabs = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'];

export default function UnderlinedTabs() {
  return (
    <section className="w-full flex h-[52px] border-b border-grey2 relative">
      {tabs.map((tab, index) => (
        <UnderlinedTab key={tab + `123`} TabNumber={index} name={tab} />
      ))}
    </section>
  );
}
