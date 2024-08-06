"use client";

import Image from "next/image";
import { useState } from "react";
import { ReactSVG } from "react-svg";

export default function UploadPicture({ img }) {
  const imgUrl = `https://jkyhtwrybkepbzpwanme.supabase.co/storage/v1/object/public/avatars/${img}`;
  const [preview, setPreview] = useState(imgUrl);

  const handleFileChange = ({ target }) => {
    setPreview(URL.createObjectURL(target.files[0]));
  };

  return (
    <div className="mx-6 mb-6 p-5 md:mx-10 bg-light_grey rounded-xl sm:flex sm:items-center">
      <p className="text-grey text-base mb-4 sm:mr-auto">Profile picture</p>

      <label
        className="block relative w-[193px] h-[193px] mb-6 cursor-pointer sm:flex-shrink-0 sm:mr-6"
        htmlFor="picture"
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
          <span className="text-base font-semibold">+ Upload Image</span>
        </div>
      </label>

      <p className="text-grey text-xs sm:w-[127px]">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>
    </div>
  );
}
