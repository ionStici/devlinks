import { Helmet, HelmetData } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

const helmetData = new HelmetData({});

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} // devlinks` : undefined}
      defaultTitle="devlinks // Centralize Your Developer Presence"
    >
      <meta
        name="description"
        content={
          description
            ? description
            : 'Build and customize your devlinks profile to share all your developer-related links in one place. Seamlessly connect your GitHub, LinkedIn, and other platforms with a single, sharable URL.'
        }
      />
    </Helmet>
  );
};
