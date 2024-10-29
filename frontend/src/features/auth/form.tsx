import { type FormEvent, type ReactNode } from "react";
import { useAuth } from "@/lib/auth-context";

type FormProps = {
  children: ReactNode;
};

export default function Form({ children }: FormProps) {
  const { login, user } = useAuth();

  async function submit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as { email: string; password: string };

    // login(data);

    login("mike@email.com", "P@ssw0rd");
  }

  return (
    <>
      <form onSubmit={submit} className="flex flex-col gap-6 mb-6">
        {children}
      </form>
    </>
  );
}
