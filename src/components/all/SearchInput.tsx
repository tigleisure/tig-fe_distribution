import SearchInputSVG from '@public/svg/searchInput.svg';
import { cn } from '@utils/cn';
import { forwardRef } from 'react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  result?: boolean;
  className?: string;
}

// eslint-disable-next-line react/display-name
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ result = false, className, ...props }, ref) => {
    return (
      <div className="bg-grey2 w-full h-[40px] flex items-center gap-[6px] body3 px-[12px] rounded-[50px]">
        <SearchInputSVG />
        <input
          type="text"
          className={cn(
            'grow bg-grey2',
            {
              'placeholder-grey7': result,
              'placeholder-grey5': !result,
            },
            className
          )}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);
