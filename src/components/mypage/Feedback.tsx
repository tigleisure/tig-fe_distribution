'use client';
import { useFeedbackSubmit } from '@apis/mypage/feedbackSubmit';
import FullButton from '@components/all/FullButton';
import ToastUI, { toastUIDuration } from '@components/all/ToastUI';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [toastId, setToastId] = useState<string | null>(null);
  const { mutate } = useFeedbackSubmit();

  const HandleClick = () => {
    if (toastId !== null) {
      toast.remove(toastId);
    }
    const id = toast.custom(
      <ToastUI message="성공적으로 의견을 전달했어요" iswarning={false} />,
      {
        duration: toastUIDuration,
      }
    );
    // API 호출 필요
    mutate({ message: feedback });
    setToastId(id);
    setFeedback('');
  };

  return (
    <section className="w-eightNineWidth bg-grey1 p-5 flex flex-col gap-6 rounded-[12px] mb-10">
      <p className="text-grey7 title3">TIG에 소중한 의견을 남겨주세요!</p>
      <textarea
        placeholder={
          'TIG는 고객 의견에 귀 기울일 준비가 되어있어요!\nex) 이런 기능이 있었으면 좋겠어요.'
        }
        className="w-full h-[128px] rounded-[12px] border border-grey3 p-4 caption3"
        id="feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      ></textarea>
      <FullButton
        bgColor={feedback.trim() ? 'primary_orange1' : 'grey3'}
        color={feedback.trim() ? 'white' : 'grey5'}
        content="의견 보내기"
        size="md"
        disabled={!feedback.trim()}
        onClick={HandleClick}
        className="disabled:cursor-not-allowed disabled:active:bg-grey3"
      />
    </section>
  );
}
