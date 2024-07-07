// 해당 컴포넌트는 위시리스트, 마이페이지 등에서 쓰이는 화살표 없는 헤더를 구현하기 위해 만듬
interface NoneArrowHeaderProps {
  title: string;
}

export default function NoneArrowHeader({ title }: NoneArrowHeaderProps) {
  return (
    <header className="w-full h-[68px] flex justify-start items-center pl-5 title1 text-grey7 absolute top-0">
      <span>{title}</span>
    </header>
  );
}
