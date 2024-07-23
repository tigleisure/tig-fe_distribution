'use client'
import FullButton from "@components/all/FullButton";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <main className="w-full h-full p-5 gap-[40px] flex flex-col justify-center">
      <FullButton bgColor="primary_orange1" color="white" content="예약 관리" size="lg" onClick={()=>{
        router.push('/djemalsvpdlwl/manage-reservation');
      }}/>
    </main>
  )
}
