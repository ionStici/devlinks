import { Spinner } from '@/components/ui/spinner';
import { useGetList } from './get-list-api';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import iconProfile from '@/assets/icons/icon-profile.svg';
import { Head } from '@/components/seo';

export function List() {
  const { data, isLoading, error } = useGetList();

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !data || data.length <= 0) {
    return <Message message={error?.message || 'No data found'} />;
  }

  return (
    <div className="flex items-center justify-center min-h-dvh p-5">
      <Head title="List" />
      <ul className="flex flex-col">
        {data.map((username, i) => {
          return (
            <li
              key={i}
              className="border-b last:border-b-0 border-borders mb-3 pb-3"
            >
              <Link
                to={`/@${username}`}
                className="flex items-center gap-2 py-3 px-5 rounded-xl hover:bg-white hover:shadow-section transition"
              >
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
