import { FormEvent, type ReactNode } from "react";

type FormProps = {
  children: ReactNode;
};

async function submit(e: FormEvent) {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const response = await res.json();

  console.log(response);
}

export default function Form({ children }: FormProps) {
  return (
    <form onSubmit={submit} className="flex flex-col gap-6 mb-6">
      {children}
    </form>
  );
}
