'use client'
import FullButton from "@components/all/FullButton";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <main className="w-full h-full p-5 gap-[20px] flex flex-col justify-center">
      <FullButton bgColor="primary_orange1" color="white" content="예약 관리" size="lg" onClick={()=>{
        router.push('/djemalsvpdlwl/manage-reservation');
      }}/>
      <FullButton bgColor="primary_orange1" color="white" content="쿠폰 발급" size="lg" onClick={()=>{
        router.push('/djemalsvpdlwl/get-couponcode');
      }}/>
      <FullButton bgColor="primary_orange1" color="white" content="유저 피드백" size="lg" onClick={()=>{
        router.push('/djemalsvpdlwl/show-feedback');
      }}/>
    </main>
  )
}
