import { EditorLayout } from '@/components/layout/editor-layout';
import { Head } from '@/components/seo';
import { AccountButtons } from '@/features/editor/account-buttons';
import { AccountHeading } from '@/features/editor/account-heading';
import {
  changeEmailApi,
  ChangeEmailDto,
} from '@/features/editor/api/change-email';
import {
  changePasswordApi,
  ChangePasswordDto,
} from '@/features/editor/api/change-password';
import {
  deleteAccountApi,
  DeleteAccountDto,
} from '@/features/editor/api/delete-account';
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
import { useAuth, useUser } from '@/lib/auth';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function AccountRoute() {
  const { user } = useUser();
  const { setUser, logout } = useAuth();
  const { email } = user;

  const [activeSetting, setActiveSetting] =
    useState<SettingsEnum>('change-email');

  const { register, handleSubmit, formState, clearErrors, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const { errors } = formState;

  function clearError(name: string) {
    clearErrors(name);
  }

  async function onSubmit(data: FieldValues) {
    try {
      if (activeSetting === 'change-email') {
        const res = await changeEmailApi({
          email,
          newEmail: data.email,
          password: data.password,
        } as ChangeEmailDto);

        toast.success(res.message);
        setUser(res.user);
        reset();
      }

      if (activeSetting === 'change-password') {
        const res = await changePasswordApi({
          email,
          password: data.password,
          newPassword: data['new-password'],
        } as ChangePasswordDto);

        toast.success(res.message);
        reset();
      }

      if (activeSetting === 'delete-account') {
        const res = await deleteAccountApi({
          email,
          password: data.password,
        } as DeleteAccountDto);

        toast.success(res.message);
        logout();
      }
    } catch (error) {
      toast.error(String(error));
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
              email={email}
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
