'use client';
import { cn } from '@utils/cn';
import { ProfileInformationItemProps } from 'types/mypage/MyPageTypes';
import { useState, useEffect, useRef } from 'react';
import { isValidEmail, isValidPhoneNumber } from '@utils/validationCheck';
import toast from 'react-hot-toast';
import ToastUI from './ToastUI';
import { formatPhoneNumber } from '@utils/formattingPhoneNumber';
import { useChangeUserEmail } from '@apis/mypage/changeUserEmail';
import { useChangeUserPhoneNumber } from '@apis/mypage/changeUserPhoneNumber';
import { useChangeUserName } from '@apis/mypage/changeUserName';

export default function ProfileInformationItem({
  labelName,
  inputValue,
}: ProfileInformationItemProps) {
  const [inputBoxEditStage, setInputBoxEditStage] = useState<1 | 2>(1);
  const [inputData, setInputData] = useState<string>(inputValue);
  const [toastId, setToastId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: changeEmailMutate } = useChangeUserEmail();
  const { mutate: changePhoneNumberMutate } = useChangeUserPhoneNumber();
  const { mutate: changeNameMutate } = useChangeUserName();

  const handleChangeInputData = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(ev.target.value);
    if (labelName === '휴대폰번호')
      setInputData(formatPhoneNumber(ev.target.value));
  };

  const handleSaveNewInputData = (data: string) => {
    if (labelName === '이름') {
      changeNameMutate({ name: data });
      setInputBoxEditStage(1);
      return;
    } else if (labelName === '휴대폰번호') {
      changePhoneNumberMutate({ phoneNumber: data });
      setInputBoxEditStage(1);
      return;
    } else {
      // labelName === '이메일'
      changeEmailMutate({ email: data });
      setInputBoxEditStage(1);
    }
  };

  const toastUIDuration = 200;

  const handleWrongEmailSave = () => {
    if (toastId !== null) {
      toast.remove(toastId);
    }
    const id = toast.custom(
      <ToastUI message="올바른 이메일이 아닙니다" iswarning={true} />,
      {
        duration: toastUIDuration,
      }
    );

    setToastId(id);
  };

  const handleWrongPhoneNumberSave = () => {
    if (toastId !== null) {
      toast.remove(toastId);
    }
    const id = toast.custom(
      <ToastUI message="올바른 전화번호가 아닙니다" iswarning={true} />,
      {
        duration: toastUIDuration,
      }
    );

    setToastId(id);
  };

  useEffect(() => {
    if (inputBoxEditStage === 2) {
      inputRef.current?.focus();
    }
  });

  const handleSubmit = () => {
    if (labelName === '이메일' && !isValidEmail(inputData)) {
      // toastUI를 띄워주는 로직
      handleWrongEmailSave();
      return;
    }

    if (labelName === '휴대폰번호' && !isValidPhoneNumber(inputData)) {
      // toastUI를 띄워주는 로직
      handleWrongPhoneNumberSave();
      return;
    }

    handleSaveNewInputData(inputData);
    toast.custom(
      <ToastUI message="변경이 완료되었습니다" iswarning={false} />,
      {
        duration: toastUIDuration,
      }
    );
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleBlur = () => {
    setInputBoxEditStage(1);
    setInputData(inputValue);
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
            {inputData !== ''
              ? inputData
              : `${labelName}${
                  labelName === '휴대폰번호' ? '를' : '을'
                } 입력해주세요`}
          </span>
        )}
        {inputBoxEditStage === 2 && (
          <input
            value={inputData}
            type={labelName === '휴대폰번호' ? 'tel' : 'text'}
            onChange={handleChangeInputData}
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="body4 w-[150px] text-grey7 shadow-writingReviewInput flex rounded-[4px] justify-start items-center pt-2 pl-2 pb-2"
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
            onClick={handleSubmit}
          >
            저장
          </button>
        )}
      </div>
    </div>
  );
}
