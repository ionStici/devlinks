"use client";

import Image from "next/image";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { ReactSVG } from "react-svg";

type UploadPictureProps = {
  img: string;
};

export default function UploadPicture({ img }: UploadPictureProps) {
  const imgUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${img}`;
  const [preview, setPreview] = useState<string | null>(() =>
    img ? imgUrl : null
  );
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];
    setError("");

    if (img) {
      setPreview((prevImg) => {
        try {
          if (img.size > 750000) {
            setError("The image is too large");
            return prevImg;
          }
          if (img.type.split("/")[0] !== "image") {
            setError("Wrong image format");
            return prevImg;
          }
          return URL.createObjectURL(img);
        } catch (error) {
          console.log((error as Error).message);
          return prevImg;
        }
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === "Enter") {
      const inputElement = document.getElementById(
        "picture"
      ) as HTMLInputElement;
      inputElement?.click();
    }
  };

  return (
    <div className="relative mx-6 mb-6 p-5 md:mx-10 bg-light_grey rounded-xl sm:flex sm:items-center">
      <p className="text-grey text-base mb-4 sm:mb-0 sm:mr-auto">
        Profile picture
      </p>

      <label
        className="block relative w-[193px] h-[193px] mb-6 cursor-pointer sm:flex-shrink-0 sm:mr-6 sm:mb-0 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-purple_hover focus:ring-offset-2 hover:ring-2 hover:ring-purple_hover hover:ring-offset-2"
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
          <Image
            src={preview}
            alt="Profile Picture"
            fill
            className="rounded-xl object-cover"
            priority={true}
            sizes="193px"
          />
        )}

        <div
          className={`absolute size-full flex flex-col items-center justify-center rounded-xl text-purple bg-light_purple ${
            preview ? "!bg-black/50 !text-white" : ""
          }`}
        >
          <ReactSVG
            className={`mb-2 fill-purple ${preview ? "!fill-white" : ""}`}
            src="/assets/icon-upload-image.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("aria-label", "Upload Image");
            }}
          />
          <span className="text-base font-semibold">
            {preview ? "Change Image" : "+ Upload Image"}
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
