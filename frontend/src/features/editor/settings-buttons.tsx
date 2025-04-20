import { IconEmail, IconLock, IconTrash } from '@/assets/svg-icons';
import { type Dispatch, type SetStateAction } from 'react';

export type SettingsEnum =
  | 'change-email'
  | 'change-password'
  | 'delete-account';

type SettingsButtonsProps = {
  activeSetting: SettingsEnum;
  setActiveSetting: Dispatch<SetStateAction<SettingsEnum>>;
};

export function SettingsButtons({
  activeSetting,
  setActiveSetting,
}: SettingsButtonsProps) {
  return (
    <div className="flex items-center mb-10 mx-6 md:mx-10">
      {buttons.map(({ text, Icon, flag }) => {
        const active = activeSetting === flag;

        return (
          <button
            onClick={() => setActiveSetting(flag)}
            key={text}
            className={`
              flex-col text-center sm:flex-row 
              max-w-[200px] w-full flex gap-1 items-center justify-center p-1 py-2 first:rounded-l-md last:rounded-r-md text-purple border first:border-r-0 last:border-l-0 border-purple sm:text-left 
              transition duration-200 focus:outline-none ring-1 ring-transparent focus:bg-white
              focus:ring-purple focus:rounded-md focus:scale-[1.05] focus:!border focus:z-10
              ${active ? 'bg-purple-light' : ''}
            `}
            tabIndex={active ? -1 : 0}
            disabled={active}
          >
            <Icon className="size-6 sm:size-5 flex-shrink-0" />
            <span className="max-w-[75px] sm:max-w-full">{text}</span>
          </button>
        );
      })}
    </div>
  );
}

const buttons: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  text: string;
  flag: SettingsEnum;
}[] = [
  {
    text: 'Change Email',
    Icon: IconEmail,
    flag: 'change-email',
  },
  {
    text: 'Change Password',
    Icon: IconLock,
    flag: 'change-password',
  },
  {
    text: 'Delete Account',
    Icon: IconTrash,
    flag: 'delete-account',
  },
];
