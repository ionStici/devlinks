import Logo from '@/components/ui/logo';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { NavLink } from 'react-router-dom';
import { NavButton } from './nav-button';
import iconProfile from '@/assets/icons/icon-profile-details-header.svg';
import iconLinks from '@/assets/icons/icon-links-header.svg';
import iconPreview from '@/assets/icons/icon-preview-header.svg';
import { useUser } from '@/lib/auth';

export function NavigationBar() {
  const isTablet = useMediaQuery('(min-width: 768px)');
  const {
    user: { username },
  } = useUser();

  return (
    <nav className="flex items-center justify-between max-w-[808px] lg:max-w-[1392px] px-[24px] py-[16px] mx-auto mb-4 sm:mb-6 sm:rounded-xl bg-white shadow-section">
      <NavLink
        to="/"
        className="rounded-lg transition duration-200 focus:outline-none ring-2 ring-transparent focus:ring-purple -ml-[2px] p-[2px] md:pr-1"
      >
        <Logo size={isTablet ? 'medium' : 'small'} />
      </NavLink>

      <ul className="flex items-center">
        <NavButton icon={iconLinks} href="/editor/links">
          Links
        </NavButton>
        <NavButton icon={iconProfile} href="/editor/profile">
          Profile Details
        </NavButton>
      </ul>

      <NavLink
        to={`/@${username}`}
        className="border border-purple rounded-lg py-[10px] px-[15px] font-semibold text-purple transition duration-200 hover:bg-purple-light focus:outline-none focus:bg-purple-light"
      >
        <img
          src={iconPreview}
          alt="Preview"
          width={20}
          height={20}
          className="size-5 md:hidden"
        />
        <span className="hidden md:inline">Preview</span>
      </NavLink>
    </nav>
  );
}
