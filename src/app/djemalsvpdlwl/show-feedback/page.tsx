import { getFeedbacklist } from '@apis/djemalsvpdlwl/getFeedback';
import { Feedback } from 'types/response/response';

export default async function Page() {
  const feedback = await getFeedbacklist();
  console.log(feedback);
  return (
    <div className='w-full flex flex-col gap-5 py-5 px-10 '>
      {feedback.result.map((item: Feedback, idx) => (
        <div key={idx} className='flex flex-col gap-4 w-full items-center border border-grey3 rounded-md shadow-sm p-4 overflow-y-scroll'>
          <div className='title2'>{item.memberName}</div>
          <div className='body2'>{item.message}</div>
        </div>
      ))}
    </div>
  );
}
