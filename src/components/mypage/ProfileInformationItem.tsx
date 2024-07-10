'use client';
import { cn } from '@utils/cn';
import { ProfileInformationItemProps } from 'types/mypage/MyPageTypes';
import { useState, useEffect } from 'react';
import { isValidEmail, isValidPhoneNumber } from '@utils/validationCheck';
import toast from 'react-hot-toast';
import ToastUI, { toastUIDuration } from './ToastUI';

export default function ProfileInformationItem({
  labelName,
}: ProfileInformationItemProps) {
  const [inputBoxEditStage, setInputBoxEditStage] = useState<1 | 2>(1);
  const [inputData, setInputData] = useState<string>('');
  const [toastId, setToastId] = useState<string | null>(null);

  useEffect(() => {
    // 추후에 백엔드로부터 inputData를 받아올 훅임
    if (labelName === '이름') {
      setInputData('김티그');
    } else if (labelName === '휴대폰번호') {
      setInputData('');
    } else if (labelName === '이메일') {
      setInputData('tig@naver.com');
    }
  }, []);

  const handleChangeInputData = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(ev.target.value);
  };

  const handleSaveNewInputData = (data: string) => {
    // 실제로는 백엔드로 PATCH 요청이 전송된다.
    // 일단은 전송이 성공적으로 이루어졌다고 가정
    setInputData(data); // 한번 더 확실하게 데이터를 상태로 넣어주기 : 추후에 필요하면 삭제 가능
    setInputBoxEditStage(1);
  };

  const toastUIDuration = 200;

  const handleWrongEmailSave = () => {
    if (toastId !== null) {
      toast.remove(toastId);
    }
    const id = toast.custom(<ToastUI message="올바른 이메일이 아닙니다" />, {
      duration: toastUIDuration,
    });

    setToastId(id);
  };

  const handleWrongPhoneNumberSave = () => {
    if (toastId !== null) {
      toast.remove(toastId);
    }
    const id = toast.custom(<ToastUI message="올바른 전화번호가 아닙니다" />, {
      duration: toastUIDuration,
    });

    setToastId(id);
  };

  return (
    <div className={cn('w-full h-fit flex items-center', {})}>
      <span className="caption2 text-grey5 w-[84px]">{labelName}</span>
      <div className="grow h-fit flex justify-between items-center">
        {inputBoxEditStage === 1 && (
          <span
            className={cn('body4', {
              'text-grey7': inputData !== '',
              'text-grey3': inputData === '',
            })}
          >
            {inputData !== '' ? inputData : `${labelName}을 입력해주세요`}
          </span>
        )}
        {inputBoxEditStage === 2 && (
          <input
            value={inputData}
            onChange={handleChangeInputData}
            className="body4 text-grey7 shadow-writingReviewInput flex rounded-[4px] justify-start items-center pt-2 pl-2 pb-2"
          />
        )}
        {inputBoxEditStage === 1 && inputData !== '' && (
          <button
            className="w-fit h-fit rounded-md title4 text-grey7 bg-white shadow-mypageButton px-[14px] py-[8px]"
            onClick={() => setInputBoxEditStage(2)}
          >
            변경
          </button>
        )}
        {inputBoxEditStage === 1 && inputData === '' && (
          <button
            className="w-fit h-fit rounded-md title4 text-white bg-primary_orange1  px-[14px] py-[8px]"
            onClick={() => setInputBoxEditStage(2)}
          >
            입력
          </button>
        )}
        {inputBoxEditStage === 2 && (
          <button
            className="w-fit h-fit rounded-md title4 text-white bg-primary_orange1 px-[14px] py-[8px]"
            onClick={() => {
              if (labelName === '이메일' && !isValidEmail(inputData)) {
                // toastUI를 띄워주는 로직
                handleWrongEmailSave();
                return;
              }

              if (
                labelName === '휴대폰번호' &&
                !isValidPhoneNumber(inputData)
              ) {
                // toastUI를 띄워주는 로직
                handleWrongPhoneNumberSave();
                return;
              }

              handleSaveNewInputData(inputData);
              toast.custom(<ToastUI message="변경이 완료되었습니다" />, {
                duration: toastUIDuration,
              });
            }}
          >
            저장
          </button>
        )}
      </div>
    </div>
  );
}
