// 해당 페이지는 결제를 하고 모바일 환경에서 redirect 되는 상황을 위해 존재

export default function PaymentRedirect({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);
  return <div>This is redirect page</div>;
}
