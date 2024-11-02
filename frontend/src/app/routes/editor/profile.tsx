import { EditorLayout } from '@/components/layout/editor-layout';
import { Head } from '@/components/seo';
import { AccountButtons } from '@/features/editor/account-buttons';
import { Footer } from '@/features/editor/footer';
import { Heading } from '@/features/editor/heading';
import { ProfileInput } from '@/features/editor/profile-input';
import { SaveButton } from '@/features/editor/save-button';
import { UploadPicture } from '@/features/editor/upload-picture';
import { useUser } from '@/lib/auth';
import { ProfileFormValues } from '@/types/profile-form-values';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function ProfileRoute() {
  const [pending, setPending] = useState<boolean>(false);
  const [newImage, setNewImage] = useState<File | null>(null);

  const {
    user: { username, name, about, image },
  } = useUser();

  const { register, handleSubmit, formState, clearErrors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    values: { username, name, about },
  });
  const { errors } = formState;

  function onSubmit(data: ProfileFormValues) {
    if (pending) return;

    const profileData = { ...data, ...(newImage ? { newImage } : {}) };

    // // // // // In Progress // // // // //
    console.log(profileData);

    setPending(true);
  }

  function clearError(name: 'username' | 'name' | 'about') {
    clearErrors(name);
  }

  return (
    <EditorLayout>
      <Head
        title="Edit Your Profile"
        description="Customize your devlinks profile by adding a profile picture, updating your name, and sharing more about yourself. View a live preview of your profile as you make changes."
      />
      <Heading
        title="Profile Details"
        text="Add your details to create a personal touch to your profile."
      />
      <form
        className="flex flex-col flex-grow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <UploadPicture imgSrc={image} setNewImage={setNewImage} />
        <div className="flex flex-col gap-3 mx-6 md:mx-10 p-5 bg-light_grey rounded-xl">
          <ProfileInput
            type="text"
            name="username"
            label="Username"
            placeholder="e.g. code-wizard"
            register={register}
            error={errors.username?.message}
            clearError={clearError}
          />
          <ProfileInput
            type="text"
            name="name"
            label="Full Name"
            placeholder="e.g. Harry Potter"
            register={register}
            error={errors.name?.message}
            clearError={clearError}
          />
          <ProfileInput
            type="text"
            name="about"
            label="About You"
            placeholder="e.g. Wizard by profession"
            register={register}
            error={errors.about?.message}
            clearError={clearError}
          />
        </div>
        <Footer>
          <AccountButtons />
          <SaveButton pending={pending}>Save</SaveButton>
        </Footer>
      </form>
    </EditorLayout>
  );
}
