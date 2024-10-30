import logoLarge from '@/assets/logos/logo-devlinks-large.svg';
import logoSmall from '@/assets/logos/logo-devlinks-small.svg';

type LogoProps = {
  size: 'large' | 'medium' | 'small';
};

export default function Logo({ size }: LogoProps) {
  return (
    <>
      {size === 'large' && (
        <img
          src={logoLarge}
          alt="Devlinks Logo"
          width={183}
          height={40}
          className="w-[183px] h-10"
        />
      )}
      {size === 'medium' && (
        <img
          src={logoLarge}
          alt="Devlinks Logo"
          width={146}
          height={32}
          className="w-[146px] h-8"
        />
      )}
      {size === 'small' && (
        <img
          src={logoSmall}
          alt="Devlinks Logo"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      )}
    </>
  );
}
