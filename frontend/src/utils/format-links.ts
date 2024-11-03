import { platforms as allPlatforms } from '@/data/platforms';

export function formatLinks(formData: FormData) {
  // Pre-data
  const platforms = allPlatforms.map(({ platform }) => platform);
  const domains = allPlatforms.map(({ domains }) => domains);
  const protocol = 'https://';

  // Retrieve sorted reference
  const sorted = String(formData.get('sorted')).split(',');

  // Prepare data
  const unsortedLinks = platforms.reduce((acc: string[], platform, index) => {
    const input = formData.get(platform) as string;

    if (input === null || input === '') return acc;

    // If 'Website', return whatever value with https:// prefix
    if (formData.has(platform) && platform === 'Website') {
      const trimmedInput = input.replace(/\s+/g, '').toLowerCase();

      const link = (
        trimmedInput.startsWith('https://')
          ? trimmedInput
          : 'https://' + trimmedInput
      ).slice(0, 50);

      acc.push(`${platform}%${link}`);
      return acc;
    }

    // Check input domain
    const domain = domains[index].find((domain) =>
      input.toLowerCase().includes(domain)
    );

    // If not valid domain, pass a "INVALID" flag
    if (!domain) {
      acc.push(`INVALID${platform}`);
      return acc;
    }

    // Create the url
    const userPath = input
      .toLowerCase()
      .split(domain)[1]
      .replace(/\s+/g, '')
      .slice(0, 50);

    const link = `${platform}%${protocol}${domain}${userPath}`;
    acc.push(link);

    return acc;
  }, []);

  // Check for "INVALID" flags
  const invalidLink = unsortedLinks
    .find((link) => link.startsWith('INVALID'))
    ?.split('INVALID')[1];

  // Return if data contain invalid links
  if (invalidLink) {
    throw new Error(`Invalid URL for ${invalidLink}`);
  }

  // Sort the array
  const links = unsortedLinks.sort((a, b) => {
    return sorted.indexOf(a.split('%')[0]) - sorted.indexOf(b.split('%')[0]);
  });

  return links;
}
