import iconUpload from '@/assets/icons/icon-upload-image.svg';
import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

type UploadPictureProps = {
  openModal: () => void;
  currImage: string;
  newImage: string;
};

export function UploadPicture({
  openModal,
  currImage,
  newImage,
}: UploadPictureProps) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (newImage) setSrc(newImage);
    else if (currImage) setSrc(currImage);
    else setSrc(null);
  }, [newImage, currImage]);

  const handleError = () => {
    if (src === newImage && currImage) setSrc(currImage);
    else setSrc(null);
  };

  return (
    <div className="relative mx-6 mb-6 p-5 md:mx-10 bg-grey-light rounded-xl sm:flex sm:items-center">
      <p className="text-grey mb-4 sm:mb-0 sm:mr-auto">Profile picture</p>

      <button
        type="button"
        onClick={openModal}
        className="block relative w-[193px] h-[193px] mb-6 cursor-pointer sm:flex-shrink-0 sm:mr-6 sm:mb-0 rounded-xl transition duration-200 focus:outline-none ring-2 ring-transparent ring-offset-2 focus:ring-purple-hover hover:ring-purple-hover"
      >
        {src && (
          <img
            src={src}
            onError={handleError}
            alt="Profile Picture"
            width={193}
            height={193}
            className="size-[193px] rounded-xl object-cover"
          />
        )}

        <div
          className={`absolute top-0 left-0 size-full flex flex-col items-center justify-center rounded-xl text-purple bg-purple-light 
          ${src ? '!bg-black/50 !text-white' : ''}`}
        >
          <ReactSVG
            src={iconUpload}
            className={`mb-2 ${src ? 'fill-white' : 'fill-purple'}`}
            beforeInjection={(svg) => {
              svg.setAttribute('aria-label', 'Upload Image');
            }}
          />
          <span className="font-semibold">
            {src ? 'Change Image' : '+ Upload Image'}
          </span>
        </div>
      </button>

      <p className="text-grey text-xs sm:w-[127px]">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>

      {/* {error && (
        const [error, setError] = useState<string>('');
        <p className="absolute left-5 top-[259px] sm:left-auto sm:top-[150px] sm:right-5 text-red text-xs sm:w-[127px]">
          {error}
        </p>
      )} */}
    </div>
  );
}
