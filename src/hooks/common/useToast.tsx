import { useState } from 'react';
import toast from 'react-hot-toast';
import ToastUI, { toastUIDuration } from '@components/all/ToastUI';

export const useToast = () => {
  const [toastId, setToastId] = useState<string | null>(null);

  const showToast = (message: string, isWarning: boolean = false) => {
    if (toastId !== null) {
      toast.remove(toastId);
    }
    const id = toast.custom(
      <ToastUI message={message} iswarning={isWarning} />,
      {
        duration: toastUIDuration,
      }
    );
    setToastId(id);
  };

  return { showToast };
};
