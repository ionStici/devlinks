import { TinySpinner } from '@/components/ui/tiny-spinner';
import { type ReactNode } from 'react';

type SaveButtonProps = {
  children: ReactNode;
  pending: boolean;
  newChanges?: boolean;
};

export function SaveButton({ children, pending, newChanges }: SaveButtonProps) {
  return (
    <button
      disabled={pending}
      className={`flex items-center justify-center h-[46px] w-full xs:w-[91px] bg-purple rounded-lg text-white text-base font-medium hover:bg-purple-hover hover:shadow-input transition duration-200 focus:outline-none ring-[2px] ring-transparent ring-offset-2 focus:ring-purple disabled:bg-borders disabled:shadow-none
        ${newChanges ? '!bg-[#16a34a]' : ''}`}
    >
      {pending ? <TinySpinner /> : children}
    </button>
  );
}
