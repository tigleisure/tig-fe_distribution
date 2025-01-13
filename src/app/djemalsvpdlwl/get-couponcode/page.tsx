'use client';
import { issueCoupon } from '@apis/djemalsvpdlwl/issusCoupon';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import toast, { Toaster } from 'react-hot-toast';
import ToastUI, { toastUIDuration } from '@components/all/ToastUI';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/components/ui/select';

export default function Page() {
  const [coupon, setCoupon] = useState<string | null>(null);
  const [toastId, setToastId] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const couponCode = await issueCoupon();
      setCoupon(couponCode.result.code);
      if (toastId !== null) {
        toast.remove(toastId);
      }
      const id = toast.custom(
        <ToastUI message="쿠폰이 발급되었어요" iswarning={false} />,
        {
          duration: toastUIDuration,
        }
      );

      setToastId(id);
    } catch (error) {
      if (toastId !== null) {
        toast.remove(toastId);
      }
      const id = toast.custom(
        <ToastUI message="쿠폰발급에 실패했어요" iswarning={false} />,
        {
          duration: toastUIDuration,
        }
      );
    }
  };

  const copyToClipboard = () => {
    if (coupon) {
      navigator.clipboard
        .writeText(coupon)
        .then(() => {
          toast.success('쿠폰 코드가 클립보드에 복사되었습니다.');
        })
        .catch(() => {
          toast.error('클립보드 복사에 실패했습니다.');
        });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="max-w-[480px] w-full mx-auto p-6 flex flex-col justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">쿠폰 발급</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input placeholder="쿠폰이름" />
            <div className="relative mx-auto">
              <Select >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="쿠폰 할인율" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15%">15%</SelectItem>
                  <SelectItem value="30%">30%</SelectItem>
                  <SelectItem value="50%">50%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={handleClick}>
              새로운 쿠폰 발급하기
            </Button>

            {coupon && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input value={coupon} readOnly className="font-mono" />
                  <Button onClick={copyToClipboard} variant="outline">
                    복사
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Toaster position="bottom-center" containerStyle={{ bottom: '75px' }} />
      </main>
    </div>
  );
}
