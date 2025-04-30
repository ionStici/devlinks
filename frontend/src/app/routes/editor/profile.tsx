import { EditorLayout } from '@/components/layout/editor-layout';
import { Head } from '@/components/seo';
import { AccountButtons } from '@/features/editor/account-buttons';
import { updateProfile } from '@/features/editor/api/update-profile';
import { Footer } from '@/features/editor/footer';
import { Heading } from '@/features/editor/heading';
import { ProfileInput } from '@/features/editor/profile-input';
import { SaveButton } from '@/features/editor/save-button';
import { UploadPicture } from '@/features/editor/upload-picture';
import { UploadPictureModal } from '@/features/editor/upload-picture-modal';
import { useAuth, useUser } from '@/lib/auth';
import { ProfileFormValues } from '@/types/profile-form-values';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export function ProfileRoute() {
  const [pending, setPending] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setUser } = useAuth();
  const queryClient = useQueryClient();

  const {
    user: { username, name, about, image },
  } = useUser();

  const [newImage, setNewImage] = useState<string>(image);

  const { register, handleSubmit, formState, clearErrors, watch } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    values: { username, name, about },
  });
  const { errors } = formState;

  const newChanges =
    watch('username') !== username ||
    watch('name') !== name ||
    watch('about') !== about ||
    image !== newImage;

  async function onSubmit(data: ProfileFormValues) {
    if (pending) return;
    setPending(true);

    const profileData = { ...data, image: newImage };

    try {
      const { user, message } = await updateProfile(profileData);
      setUser(user);
      setNewImage(user.image);

      await queryClient.invalidateQueries({ queryKey: ['profile', username] });

      toast.success(message);
    } catch (error) {
      toast.error(String(error));
    }

    setPending(false);
  }

  const clearError = (name: 'username' | 'name' | 'about') => clearErrors(name);

  useEffect(() => {
    if (isOpen) document.documentElement.classList.add('overflow-hidden');
    return () => document.documentElement.classList.remove('overflow-hidden');
  }, [isOpen]);

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

      {isOpen && (
        <UploadPictureModal
          close={() => setIsOpen(false)}
          currImage={image}
          newImage={newImage}
          setNewImage={(img: string) => setNewImage(img)}
        />
      )}
      <form
        className="flex flex-col flex-grow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <UploadPicture
          openModal={() => setIsOpen(true)}
          currImage={image}
          newImage={newImage}
        />
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
          <SaveButton pending={pending} newChanges={newChanges}>
            Save
          </SaveButton>
        </Footer>
      </form>
    </EditorLayout>
  );
}
