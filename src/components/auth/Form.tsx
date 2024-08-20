import { type ReactNode } from "react";

type FormProps = {
  children: ReactNode;
};

export default function Form({ children }: FormProps) {
  return <form className="flex flex-col gap-6 mb-6">{children}</form>;
}
