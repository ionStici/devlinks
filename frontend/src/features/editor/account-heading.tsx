import { SettingsEnum } from './settings-buttons';

type AccountHeadingProps = {
  activeSetting: SettingsEnum;
};

export function AccountHeading({ activeSetting }: AccountHeadingProps) {
  return (
    <h2 className="text-xl font-medium border-b border-red w-fit px-1 pb-[1px] mb-8 mx-6 md:mx-10">
      {headings[activeSetting]}
    </h2>
  );
}

const headings = {
  'change-email': 'Change Your Email Address',
  'change-password': 'Change Your Password',
  'delete-account': 'Delete Your Account',
};
