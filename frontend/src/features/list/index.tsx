import { Spinner } from '@/components/ui/spinner';
import { useGetList } from './get-list-api';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import iconProfile from '@/assets/icons/icon-profile.svg';

export function List() {
  const { data, isLoading, error } = useGetList();
  if (isLoading) return <Spinner />;
  if (error) return <Message message={error.message} />;
  if (!data) return <Message message="No data" />;

  return (
    <div className="flex items-center justify-center min-h-dvh p-5">
      <ul className="flex flex-col">
        {data.map((username, i) => {
          return (
            <li key={i} className="border-b border-borders px-3 mb-2 pb-2">
              <Link to={`/@${username}`} className="flex items-center gap-2">
                <IconProfile className="size-6" />
                <span className="text-lg font-medium text-grey">
                  {username}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
<ReactSVG
  src={iconProfile}
  className="size-6"
  beforeInjection={(svg) => {
    svg.setAttribute('aria-label', 'Profile');
  }}
/>;

function Message({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center min-h-dvh text-black text-xl p-5">
      {message}
    </div>
  );
}

function IconProfile({ className }: { className: string }) {
  return (
    <ReactSVG
      src={iconProfile}
      className={className}
      beforeInjection={(svg) => {
        svg.setAttribute('aria-label', 'Profile');
      }}
    />
  );
}
