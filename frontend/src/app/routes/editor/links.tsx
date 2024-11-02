import { EditorLayout } from '@/components/layout/editor-layout';
import { Head } from '@/components/seo';
import { Footer } from '@/features/editor/footer';
import { AccountButtons } from '@/features/editor/account-buttons';
import { Heading } from '@/features/editor/heading';
import { LinksForms } from '@/features/editor/links-form';
import { SaveButton } from '@/features/editor/save-button';
import { useUser } from '@/lib/auth';
import { useState, type FormEvent } from 'react';

export function LinksRoute() {
  const [pending, setPending] = useState<boolean>(false);

  const {
    user: { links },
  } = useUser();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    // await new Promise((resolve) => setTimeout(resolve, 1500)); // TEMP

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    console.log(data);

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
