import iconUrl from '@/assets/icons/icon-links-header.svg';
import { urlRegex } from '@/utils/regex';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';

type Props = {
  close: () => void;
  currImage: string;
  newImage: string;
  setNewImage: (img: string) => void;
};

export function UploadPictureModal({
  close,
  currImage,
  newImage,
  setNewImage,
}: Props) {
  const [error, setError] = useState('');
  const [url, setUrl] = useState(newImage || currImage || '');

  async function submit() {
    if (url === '') {
      setNewImage(url);
      close();
    }

    if (url.length > 1024 || !urlRegex.test(url)) {
      setError(
        'Invalid input: URL must start with http:// or https:// and be no longer than 1024 characters.'
      );
      return;
    }

    try {
      await validateImageUrl(url);
      setNewImage(url);
      close();
    } catch {
      setError("That URL doesn't point to a valid image file.");
    }
  }

  return (
    <div className="fixed z-10 top-0 left-0 w-full max-h-dvh min-h-dvh px-6 py-20 backdrop-blur-[2px] bg-black/50 overflow-y-scroll scrollbar-hide overflow-hidden">
      <div className="w-full max-w-[450px] mx-auto bg-white rounded-lg p-5">
        <div className="flex items-start justify-between mb-2 xs:mb-4 text-dark-grey">
          <h1 className="text-xl xs:text-2xl font-semibold">Profile Picture</h1>
          <button
            type="button"
            onClick={close}
            className="size-6 xs:size-7 font-medium border border-borders rounded-md hover:shadow-box"
          >
            X
          </button>
        </div>

        <p className="text-grey mb-5 xs:mb-7 text-sm xs:text-base">
          To set your profile picture, please enter the URL of your image in the
          field provided.
        </p>

        <div className="relative mb-6">
          <input
            type="text"
            className="w-full h-[46px] pl-9 pr-3 border border-borders rounded-md 
            transition duration-200 focus:outline-none focus:border-purple hover:border-purple-hover
            text-dark-grey"
            placeholder="Profile picture URL"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? submit() : undefined)}
          />
          <ReactSVG
            src={iconUrl}
            className="absolute top-[13px] left-[10px] fill-grey"
            beforeInjection={(svg) => {
              svg.setAttribute('aria-label', 'URL');
            }}
          />
        </div>

        <div className="flex gap-3 md:gap-5">
          <button
            type="button"
            onClick={close}
            className="flex-1 h-10 border border-borders rounded-md bg-grey-light text-grey font-medium text-lg hover:shadow-box transition duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            className="flex-1 h-10 rounded-md bg-purple text-white font-medium text-lg transition duration-200 hover:bg-purple-hover"
          >
            Submit
          </button>
        </div>

        {error && <p className="text-sm text-red mt-3">{error}</p>}
      </div>
    </div>
  );
}

function validateImageUrl(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Not a downloadable image'));
    img.src = url;
  });
}
