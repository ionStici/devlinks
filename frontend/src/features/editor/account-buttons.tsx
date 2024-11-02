import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useState } from 'react';
import iconProfile from '@/assets/icons/icon-profile.svg';
import { NavLink } from 'react-router-dom';
import { IconSettings, IconLogOut, IconDoc } from '@/assets/svg-icons';
import { TinySpinner } from '@/components/ui/tiny-spinner';
import { useAuth } from '@/lib/auth';

export function AccountButtons() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [logoutPending, setLogoutPending] = useState<boolean>(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const { logout } = useAuth();

  async function logoutAction() {
    if (logoutPending) return;
    setLogoutPending(true);

    await logout();
    setLogoutPending(false);
  }

  return (
    <>
      <button
        aria-label="Actions"
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center justify-center flex-shrink-0 w-[46px] h-[46px] shadow-box bg-grey-light rounded-lg sm:ml-auto transition hover:ring-purple focus:ring-purple hover:ring-2 focus:outline-none focus:ring-2"
      >
        <img
          className="size-6"
          src={iconProfile}
          alt="Profile"
          width={24}
          height={24}
        />
      </button>

      {isOpen && (
        <div
          ref={ref}
          className="absolute z-10 right-0 bottom-[78px] w-full xs:w-[175px] md:bottom-0 md:right-[170px] bg-white shadow-dropDown rounded-lg border border-borders"
        >
          <ul className="divide-y divide-borders text-base">
            <li className="text-grey">
              <NavLink
                to={'/editor/account'}
                className="flex items-center w-full gap-[10px] px-4 py-2 group transition duration-200 hover:text-purple bg-white rounded-lg focus:outline-none ring-2 ring-transparent focus:ring-purple focus:scale-105 relative focus:z-10"
              >
                <IconSettings className="size-[22px] transition duration-200 stroke-grey group-hover:stroke-purple" />
                <span>Account</span>
              </NavLink>
            </li>
            <li className="text-grey">
              <NavLink
                to={'/terms'}
                className="flex items-center w-full gap-[10px] px-4 py-2 group transition duration-200 hover:text-purple bg-white rounded-lg focus:outline-none ring-2 ring-transparent focus:ring-purple focus:scale-105 relative focus:z-10"
              >
                <IconDoc className="size-[22px] transition duration-200 stroke-grey group-hover:stroke-purple" />
                <span>Terms</span>
              </NavLink>
            </li>
            <li className="text-grey">
              <button
                onClick={logoutAction}
                type="button"
                disabled={logoutPending}
                className={`flex items-center w-full gap-[10px] px-4 py-2 group transition duration-200 bg-white rounded-lg focus:outline-none ring-2 ring-transparent relative text-inherit 
                  ${
                    logoutPending
                      ? ''
                      : 'hover:text-purple focus:ring-purple focus:scale-105 focus:z-10'
                  }`}
              >
                <IconLogOut
                  className={`size-6 transition duration-200 stroke-grey ${
                    logoutPending ? '' : 'group-hover:stroke-purple'
                  }`}
                />
                <span>Log Out</span>
                {logoutPending && (
                  <TinySpinner classes="ml-[6px] !border-t-purple !border-borders" />
                )}
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
