import { EditorLayout } from '@/components/layout/editor-layout';
import { Head } from '@/components/seo';
import { AccountButtons } from '@/features/editor/account-buttons';
import { updateLinks } from '@/features/editor/api/update-links';
import { Footer } from '@/features/editor/footer';
import { Heading } from '@/features/editor/heading';
import { LinksForms } from '@/features/editor/links-form';
import { SaveButton } from '@/features/editor/save-button';
import { useAuth, useUser } from '@/lib/auth';
import { User } from '@/types/user';
import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';

export function LinksRoute() {
  const [pending, setPending] = useState<boolean>(false);
  const { setUser } = useAuth();

  const {
    user: { links },
  } = useUser();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setPending(true);

    const formData = new FormData(e.currentTarget);

    try {
      const { links, message } = await updateLinks(formData);

      setUser((prevData: User | null) => {
        if (!prevData) return null;
        return { ...prevData, links: links };
      });

      toast.success(message);
    } catch (error) {
      toast.error(String(error));
    }

    setPending(false);
  }

  return (
    <EditorLayout>
      <Head
        title="Edit Your Social Links"
        description="Manage the social platforms linked to your devlinks profile. Add or edit URLs to showcase your GitHub, LinkedIn, and other accounts. Instantly preview how your profile will look to others."
      />
      <Heading
        title="Customize your links"
        text="Add/edit/remove links below and then share all your profiles with the world!"
      />
      <LinksForms links={links} onSubmit={onSubmit}>
        <Footer>
          <AccountButtons />
          <SaveButton pending={pending}>Save</SaveButton>
        </Footer>
      </LinksForms>
    </EditorLayout>
  );
}
