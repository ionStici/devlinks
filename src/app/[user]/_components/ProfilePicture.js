"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { URL } from "@/utils/constants";

export default function ProfilePicture({ image, imgUrl, username }) {
  const copyUrl = () => {
    navigator.clipboard.writeText(`${URL}${username}`);
    toast.success("The link has been copied to your clipboard!");
  };

  return (
    <Image
      className="object-cover rounded-full cursor-pointer transition active:scale-95"
      src={image ? imgUrl : `/assets/default-profile-picture.svg`}
      alt={`${username} profile picture`}
      fill
      sizes="130px"
      priority={true}
      onClick={copyUrl}
    />
  );
}
