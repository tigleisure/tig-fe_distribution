'use client';
import {
  getFeedbacklist,
  useGetFeedbacklist,
} from '@apis/djemalsvpdlwl/getFeedback';
import { useEffect, useState } from 'react';
import { Feedback, FeedbackListResponse } from 'types/response/response';

export default function Page() {
  const { data, isSuccess } = useGetFeedbacklist();

  return (
    <div className="w-full flex flex-col gap-5 py-5 px-10 ">
      {isSuccess &&
        data.result.map((item: Feedback, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 w-full items-center border border-grey3 rounded-md shadow-sm p-4 overflow-y-scroll"
          >
            <div className="title2">{item.memberName}</div>
            <div className="body2">{item.message}</div>
          </div>
        ))}
    </div>
  );
}
