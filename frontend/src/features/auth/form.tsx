import { FormEvent, useState, type ReactNode } from 'react';
import { TinySpinner } from '@/components/ui/tiny-spinner';

type FormProps = {
  children: ReactNode;
  pendingText: string;
  btnText: string;
};

export function Form({ children, pendingText, btnText }: FormProps) {
  const [pending, setPending] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    console.log(data);

    setPending(true);
  };

  return (
    <form className="flex flex-col gap-6 mb-6" onSubmit={handleSubmit}>
      {children}
      <button
        disabled={pending}
        className="flex items-center justify-center gap-4 h-[46px] rounded-lg text-white bg-purple
        transition duration-200 focus:outline-none ring-[2px] ring-transparent ring-offset-2 focus:ring-purple
      disabled:bg-borders disabled:shadow-none hover:bg-purple-hover hover:shadow-input"
      >
        {pending ? (
          <>
            <TinySpinner />
            <span>{pendingText}</span>
          </>
        ) : (
          btnText
        )}
      </button>
    </form>
  );
}
