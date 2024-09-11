import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full h-[25%] px-footerHorizontal flex flex-col justify-center gap-y-[15px] py-[30px] bg-grey2">
      <span className="body3 text-grey7">주식회사 징고</span>
      <div className="flex flex-col gap-y-[2px]">
        <div className="flex flex-start items-center gap-x-[10px]">
          <div className="flex flex-start items-center gap-x-[10px]">
            <span className="caption2 text-grey5">사업자등록번호</span>
            <span className="caption2 text-grey4">137-87-03348</span>
          </div>
          <span className="caption2 text-grey4">|</span>
          <div className="flex flex-start items-center gap-x-[10px]">
            <span className="caption2 text-grey5">대표</span>
            <span className="caption2 text-grey4">임세민</span>
          </div>
        </div>
        <div className="flex flex-start items-center gap-x-[10px]">
          <span className="caption2 text-grey5">E-mail</span>
          <span className="caption2 text-grey4">
            tig.business.contact@gmail.com
          </span>
        </div>
        <div className="flex flex-start items-center gap-x-[10px]">
          <span className="caption2 text-grey5">전화번호</span>
          <span className="caption2 text-grey4">010-7698-7017</span>
        </div>
        <div className="flex flex-start items-center gap-x-[10px]">
          <span className="caption2 text-grey5">주소</span>
          <span className="caption2 text-grey4">
            충남 홍성군 광천읍 광천로359번길 21-16, 1차동 303호(거성아파트)
          </span>
        </div>
      </div>
      <div className="flex flex-start items-center gap-x-[10px]">
        <Link
          href={
            'https://tabby-lifter-c98.notion.site/6faafb7922e64f449345cccc59c6144d'
          }
          className="body4 text-grey7"
        >
          개인정보 처리방침
        </Link>
        <span className="caption2 text-grey3">|</span>
        <Link
          href={
            'https://tabby-lifter-c98.notion.site/6faafb7922e64f449345cccc59c6144d'
          }
          className="body4 text-grey7"
        >
          서비스 이용약관
        </Link>
      </div>
    </footer>
  );
}
