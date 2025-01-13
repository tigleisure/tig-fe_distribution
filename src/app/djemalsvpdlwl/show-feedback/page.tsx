'use client';
import { useGetFeedbacklist } from '@apis/djemalsvpdlwl/getFeedback';
import { Feedback } from 'types/response/response';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';

export default function Page() {
  const { data, isSuccess } = useGetFeedbacklist();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="max-w-[480px] w-full mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">사용자 피드백</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {isSuccess && data.result.length === 0 ? (
                  <div className="text-grey7 text-center py-8">
                    아직 피드백이 없습니다.
                  </div>
                ) : (
                  isSuccess &&
                  data.result.map((item: Feedback, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{item.memberName}</h3>
                          </div>
                          <p className="text-sm text-gray-600">
                            {item.message}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
