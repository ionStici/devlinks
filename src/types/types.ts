export type userData = {
  id: number;
  created_at: string;
  userId: string;
  username: string;
  name: string;
  about: string;
  image: string;
  links: string[];
};

export type PlatformItem = {
  platform: string;
  icon: string;
  iconMod: string;
  placeholder: string;
  domains: string[];
  color: string;
};

export type PlatformsData = PlatformItem[];
