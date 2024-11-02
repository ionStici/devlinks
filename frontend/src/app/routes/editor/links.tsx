import { EditorLayout } from '@/components/layout/editor-layout';
import { Head } from '@/components/seo';
import { Heading } from '@/features/editor/heading';
import { useUser } from '@/lib/auth';

export function LinksRoute() {
  const {
    user: { links },
  } = useUser();

  console.log(links);

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
      {/* <LinksForm links={links} /> */}
    </EditorLayout>
  );
}
