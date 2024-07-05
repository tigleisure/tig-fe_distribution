import FullButton from '@components/all/FullButton';

export default function ButtonCard() {
  return (
    <section className="h-[78px] w-full flex justify-center items-center px-5 py-[14px] absolute bottom-0 bg-white shadow-absoluteButton">
      <FullButton
        bgColor="primary_orange1"
        color="white"
        content="검색"
        size="lg"
      />
    </section>
  );
}
