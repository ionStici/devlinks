import { type ReactNode } from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';

type FormProps = {
  children: ReactNode;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
};

export function Form({ children, handleSubmit, onSubmit }: FormProps) {
  return (
    <form
      className="flex flex-col gap-6 mb-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {children}
    </form>
  );
}
