import { Suspense } from 'react';
import HomeContentClient from './HomeContentClient';

const UIListSkeleton = () => {
  return (
    <div className="w-full h-[198px] flex flex-col gap-4 px-[30px] pb-[20px] border-b border-grey2 mb-[20px]">
      <div className="w-full justify-between flex">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div className="w-[48px] h-[48px] rounded-full bg-gray-200 animate-pulse" />
            <div className="w-[40px] h-[16px] bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
      <div className="w-full justify-between flex">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div className="w-[48px] h-[48px] rounded-full bg-gray-200 animate-pulse" />
            <div className="w-[40px] h-[16px] bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HomeContent({
  isLogin,
  children,
}: {
  isLogin: boolean;
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex flex-col bg-white">
          {/* 헤더 자리 확보 + 탭 스켈레톤 */}
          <div className="w-full h-[52px] border-b border-grey2 bg-white flex items-center px-4">
            <div className="h-[32px] w-[64px] bg-gray-200 rounded animate-pulse" />
          </div>
          {/* UI 리스트 스켈레톤 */}
          <UIListSkeleton />
          {/* 카드 리스트 스켈레톤 */}
          <div className="flex flex-col gap-10 mt-4">
            <div className="ml-5 h-[24px] w-[200px] bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-[10px] overflow-x-scroll pr-[20px] ml-5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-[152px] flex flex-col gap-[6px] shrink-0"
                >
                  <div className="w-[152px] h-[152px] rounded-[10px] bg-gray-200 animate-pulse" />
                  <div className="flex gap-[6px] mt-[6px]">
                    <div className="h-[18px] bg-gray-200 rounded w-2/3 animate-pulse" />
                    <div className="h-[18px] bg-gray-200 rounded w-[40px] shrink-0 animate-pulse" />
                  </div>
                  <div className="h-[16px] bg-gray-200 rounded w-[80px] animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <HomeContentClient isLogin={isLogin}>{children}</HomeContentClient>
    </Suspense>
  );
}
