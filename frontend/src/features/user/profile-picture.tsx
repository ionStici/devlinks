import { copyUserUrl } from '@/utils/copy-user-url';
import fallbackPfp from '@/assets/assets/default-profile-picture.svg';

type Props = { image: string; username: string };

export function ProfilePicture({ image, username }: Props) {
  return (
    <>
      <div className="absolute z-10 top-0 left-0 w-full h-[130px] bg-purple shadow-layout xs:rounded-t-3xl" />
      <div className="relative z-20 size-[138px] mx-auto mb-[25px] bg-white rounded-full border-4 border-white shadow-profileImage">
        <img
          className="size-full object-cover rounded-full cursor-pointer transition active:scale-95"
          src={image || fallbackPfp}
          alt={`${username} profile picture`}
          sizes="130px"
          loading="lazy"
          onClick={() => copyUserUrl(username)}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== fallbackPfp) target.src = fallbackPfp;
          }}
        />
      </div>
    </>
  );
}
