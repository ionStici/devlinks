import { EditorLayout } from '@/components/layout/editor-layout';
import { Head } from '@/components/seo';
import { AccountButtons } from '@/features/editor/account-buttons';
import { AccountHeading } from '@/features/editor/account-heading';
import { ChangeEmailInputs } from '@/features/editor/change-email-inputs';
import { ChangePasswordInputs } from '@/features/editor/change-password-inputs';
import { DeleteAccountInputs } from '@/features/editor/delete-account-inputs';
import { Footer } from '@/features/editor/footer';
import { Heading } from '@/features/editor/heading';
import { SaveButton } from '@/features/editor/save-button';
import {
  SettingsButtons,
  SettingsEnum,
} from '@/features/editor/settings-buttons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function AccountRoute() {
  const [activeSetting, setActiveSetting] =
    useState<SettingsEnum>('change-email');

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({ mode: 'onSubmit', reValidateMode: 'onBlur' });

  function clearError(name: string) {
    clearErrors(name);
  }

  function onSubmit(data: unknown) {
    if (activeSetting === 'change-email') {
      console.log(data);
    }
    if (activeSetting === 'change-password') {
      console.log(data);
    }
    if (activeSetting === 'delete-account') {
      console.log(data);
    }
  }

  return (
    <EditorLayout>
      <Head title="Account" />
      <Heading
        title="Account Settings"
        text="Manage your devlinks account, you are in control."
      />
      <SettingsButtons
        activeSetting={activeSetting}
        setActiveSetting={(flag: SettingsEnum) => {
          setActiveSetting(flag);
          reset();
        }}
      />
      <AccountHeading activeSetting={activeSetting} />
      <form
        className="flex flex-col flex-grow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mx-6 md:mx-10 space-y-5">
          {activeSetting === 'change-email' && (
            <ChangeEmailInputs
              register={register}
              clearError={clearError}
              errors={errors}
            />
          )}
          {activeSetting === 'change-password' && (
            <ChangePasswordInputs
              register={register}
              clearError={clearError}
              errors={errors}
            />
          )}
          {activeSetting === 'delete-account' && (
            <DeleteAccountInputs
              register={register}
              clearError={clearError}
              errors={errors}
            />
          )}
        </div>
        <Footer>
          <AccountButtons />
          <SaveButton pending={false}>Save</SaveButton>
        </Footer>
      </form>
    </EditorLayout>
  );
}
