'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  const menuItems = [
    {
      title: "예약 관리",
      description: "사용자 예약 현황을 확인하고 관리합니다",
      path: "/djemalsvpdlwl/manage-reservation"
    },
    {
      title: "쿠폰 발급",
      description: "사용자에게 쿠폰을 발급합니다",
      path: "/djemalsvpdlwl/get-couponcode"
    },
    {
      title: "유저 피드백",
      description: "사용자 피드백을 확인합니다",
      path: "/djemalsvpdlwl/show-feedback"
    }
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="max-w-[480px] w-full mx-auto p-6 flex flex-col justify-center gap-6">
        <h1 className="text-2xl font-bold text-center mb-6">관리자 대시보드</h1>
        <div className="grid gap-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => router.push(item.path)}
            >
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
