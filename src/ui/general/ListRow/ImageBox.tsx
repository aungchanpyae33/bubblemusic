import Image from "next/image";
import { ReactNode } from "react";
import type { MediaItemType } from "../../../../database.types-fest";
import IconWrapper from "../IconWrapper";
import { Folder, User } from "lucide-react";

interface ConditionalImageRender {
  type: MediaItemType;
  cover_url: string | null;
  name: string;
}

function ConditionalImageRender({
  type,
  cover_url,
  name,
}: ConditionalImageRender) {
  if (cover_url)
    return (
      <Image
        src={cover_url}
        priority={true}
        sizes="50px"
        fill
        alt={`${type} name called ${name}`}
      />
    );

  if (type === "profile")
    return (
      <div className=" absolute inset-0 flex bg-placeholder rounded-lg  items-center justify-center">
        <IconWrapper Icon={User} className="size-[30px]" notClickable={true} />
      </div>
    );

  return (
    <div className=" absolute inset-0 bg-placeholder rounded-lg flex items-center justify-center">
      <IconWrapper Icon={Folder} className="size-[30px]" notClickable={true} />
    </div>
  );
}

interface ImageBoxProps {
  type: MediaItemType;
  cover_url: string | null;
  name: string;
  children?: ReactNode;
}
function ImageBox({ type, name, cover_url, children }: ImageBoxProps) {
  return (
    <div className="flex items-center justify-center  ">
      <div className=" relative  size-12">
        <ConditionalImageRender type={type} cover_url={cover_url} name={name} />
        {children}
      </div>
    </div>
  );
}

export default ImageBox;
