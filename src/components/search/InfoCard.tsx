import { InfoCardProps } from 'types/search/SearchTypes';

export default function InfoCard({ number, content }: InfoCardProps) {
  return (
    <article className="w-fit flex gap-2">
      <p className="w-[18px] h-[18px] rounded-full bg-primary_orange1 text-white title4 flex justify-center items-center pr-[1px] pt-[1px]">
        {number}
      </p>
      <p className="title3 text-grey7">{content}</p>
    </article>
  );
}
