'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // 실제 로그인 로직은 추후 구현
    if (id === '127' && password === 'djemals') {
      router.push('/djemalsvpdlwl');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[480px] max-w-[480px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            TIG 사업자
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-primary_orange1 hover:bg-primary_orange0"
            onClick={handleLogin}
          >
            로그인
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
