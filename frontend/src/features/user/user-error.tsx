import { Head } from '@/components/seo';
import Logo from '@/components/ui/logo';
import { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

type Props = { username: string; errorMessage: string };

export function UserError({ username, errorMessage }: Props) {
  const [usernameInput, setUsernameInput] = useState(username);
  const navigate = useNavigate();

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    navigate(`/@${usernameInput}`);
  }

  return (
    <main className="bg-grey-light">
      <Head title="User not found" />
      <div
        className="
          max-w-[476px] mx-auto p-8 min-h-dvh bg-white shadow-section
          sm:flex sm:flex-col sm:justify-center sm:py-20
          sm:bg-transparent sm:p-0 sm:shadow-none"
      >
        <NavLink
          to="/"
          className="block w-fit mx-auto mb-16 sm:mb-[51px]
            transition duration-200 focus:outline-none rounded-xl
            ring-2 ring-transparent focus:ring-purple px-2 py-1"
        >
          <Logo size="large" />
        </NavLink>
        <div className="sm:bg-white sm:p-10 sm:rounded-xl sm:shadow-section">
          <section className="flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-dark-grey mb-5 border-b-2 border-red px-2">
              {errorMessage.includes('User not found') ? errorMessage : 'Error'}
            </h1>
            <p className="text-grey text-xl mb-10">
              {errorMessage.includes('User not found')
                ? 'Please double-check the input and try again!'
                : errorMessage}
            </p>

            <form onSubmit={onSubmit} className="w-full">
              <input
                type="text"
                className="w-full h-[46px] mb-5 border border-borders rounded-lg text-dark-grey text-center
                transition duration-200 shadow-input tracking-wider
                focus:outline-none ring-2 ring-transparent focus:ring-purple hover:ring-purple-hover"
                value={usernameInput}
                onChange={({ target }) => setUsernameInput(target.value)}
              />
              <button
                className="flex items-center justify-center text-lg font-medium
                w-[200px] h-[46px] mx-auto rounded-lg bg-purple text-white 
                transition duration-200 hover:bg-purple-hover hover:shadow-input
                focus:outline-none ring-[2px] ring-offset-2 ring-transparent focus:ring-purple"
              >
                Search
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
