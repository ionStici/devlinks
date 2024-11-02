import { type ChangeEvent, type KeyboardEvent, useState } from 'react';
import { ReactSVG } from 'react-svg';
import iconUpload from '@/assets/icons/icon-upload-image.svg';

type UploadPictureProps = {
  imgSrc: string;
  setNewImage: (img: File) => void;
};

export function UploadPicture({ imgSrc, setNewImage }: UploadPictureProps) {
  const [preview, setPreview] = useState<string | null>(imgSrc || null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];
    setError('');

    if (img) {
      setPreview((prevImg) => {
        try {
          if (img.size > 750000) {
            setError('The image is too large');
            return prevImg;
          }
          if (img.type.split('/')[0] !== 'image') {
            setError('Wrong image format');
            return prevImg;
          }
          setNewImage(img);
          return URL.createObjectURL(img);
        } catch (error) {
          console.log((error as Error).message);
          return prevImg;
        }
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === 'Enter') {
      const inputElement = document.getElementById(
        'picture'
      ) as HTMLInputElement;
      inputElement?.click();
    }
  };

  return (
    <div className="relative mx-6 mb-6 p-5 md:mx-10 bg-grey-light rounded-xl sm:flex sm:items-center">
      <p className="text-grey mb-4 sm:mb-0 sm:mr-auto">Profile picture</p>

      <label
        className="block relative w-[193px] h-[193px] mb-6 cursor-pointer sm:flex-shrink-0 sm:mr-6 sm:mb-0 rounded-xl transition duration-200 focus:outline-none ring-2 ring-transparent ring-offset-2 focus:ring-purple-hover hover:ring-purple-hover"
        htmlFor="picture"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <input
          className="hidden"
          type="file"
          name="picture"
          id="picture"
          accept="image/*"
          onChange={handleFileChange}
        />

        {preview && (
          <img
            src={preview}
            alt="Profile Picture"
            width={193}
            height={193}
            className="size-[193px] rounded-xl object-cover"
          />
        )}

        <div
          className={`absolute top-0 left-0 size-full flex flex-col items-center justify-center rounded-xl text-purple bg-purple-light ${
            preview ? '!bg-black/50 !text-white' : ''
          }`}
        >
          <ReactSVG
            src={iconUpload}
            className={`mb-2 ${preview ? 'fill-white' : 'fill-purple'}`}
            beforeInjection={(svg) => {
              svg.setAttribute('aria-label', 'Upload Image');
            }}
          />
          <span className="font-semibold">
            {preview ? 'Change Image' : '+ Upload Image'}
          </span>
        </div>
      </label>

      <p className="text-grey text-xs sm:w-[127px]">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>

      {error && (
        <p className="absolute left-5 top-[259px] sm:left-auto sm:top-[150px] sm:right-5 text-red text-xs sm:w-[127px]">
          {error}
        </p>
      )}
    </div>
  );
}
