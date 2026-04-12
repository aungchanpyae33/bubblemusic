import Image from "next/image";
import type { MediaItemType } from "../../../database.types-fest";
import IconWrapper from "../general/IconWrapper";
import { Folder, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

const baseStyle =
  "lg:w-[250px] rounded overflow-hidden md:w-[200px] shrink-0 w-[180px]  aspect-square  object-cover relative bg-placeholder";
interface ListImageProps extends ComponentProps<"div"> {
  type: MediaItemType;
  cover_url: string | null;
  name: string;
  className?: string;
}

function ConditionalImageRender({ type, cover_url, name }: ListImageProps) {
  if (cover_url)
    return (
      <Image
        src={cover_url}
        priority={true}
        sizes="(min-width: 1024px) 250px, (min-width: 768px) 200px, 180px"
        fill
        alt={`${type} name called ${name}`}
      />
    );

  if (type === "profile")
    return (
      <div className=" absolute inset-0 flex items-center justify-center">
        <IconWrapper Icon={User} className="size-[100px]" notClickable={true} />
      </div>
    );

  return (
    <div className=" absolute inset-0 flex items-center justify-center">
      <IconWrapper Icon={Folder} className="size-[100px]" notClickable={true} />
    </div>
  );
}

function ListImage({
  type,
  cover_url,
  name,
  className,
  ...props
}: ListImageProps) {
  return (
    <div className={cn(baseStyle, className)} {...props}>
      <ConditionalImageRender type={type} cover_url={cover_url} name={name} />
    </div>
  );
}

export default ListImage;
